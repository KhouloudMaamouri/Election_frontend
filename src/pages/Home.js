
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Card, Col, Modal, Row } from "antd";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Layout from "../components/layout";
import ReCAPTCHA from "react-google-recaptcha";
import Reaptcha from "reaptcha";
import axios from "axios";
import socketIOClient from "socket.io-client";
const Home = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [captcha, setCaptcha] = useState(false)
    const [err, setErr] = useState()
    const [candName, setCandName] = useState("")
    const [candidatureList, setCandidatureList] = useState([])
    const [userVotedId, setUserVotedId] = useState()
    const [totalVoted, setTotalVoted] = useState()

    const handleCancel = () => {
        setIsModalVisible(false);
        window.location.reload()
    };

    useEffect(() => {
        const socket = socketIOClient(process.env.REACT_APP_ENDPPOINT_PREFIX, { transports: ['websocket'] });
        socket.on("add-vote", data => {

            setCandidatureList(data.reverse())
            console.log('data', data)

        });

    }, []);
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_ENDPPOINT}/users?roles=Candidature`).then(res => {
            setCandidatureList(res.data.user.reverse())
        }).catch(err => console.log(err))
    }, [])

    useEffect(() => {
        if (candidatureList) {
            /* Calcul total voted members */
            setTotalVoted(candidatureList.reduce((n, { totalVote }) => n + totalVote, 0))
        }
    }, [candidatureList])

    const onVerify = (value) => {
        setErr('')
        setCaptcha(true)

    }
    const handleConfirm = () => {
        if (captcha) {
            axios.post(`${process.env.REACT_APP_ENDPPOINT}/vote/${userVotedId}`, { cinId: JSON.parse(localStorage.getItem('token')).cinId }).then(res => {
                const user = JSON.parse(localStorage.getItem('token'))
                user.isVoted = true
                localStorage.setItem('token', JSON.stringify(user))
                window.location.reload()
            }).catch(err => console.log(err))
        } else {
            setErr('Vérifier la captcha')
        }
    }

    return (
        <div>
            {localStorage.getItem('token') ? <Layout>
                <p style={{ marginTop: "10px", textAlign: 'right', fontWeight: 'bold' }}>Total des votes : {totalVoted && totalVoted}</p>
                <div className="site-card-wrapper">
                    <Row gutter={16}>

                        {candidatureList.length !== 0 && candidatureList.map(cand => {
                            const percent = (cand.totalVote / totalVoted) * 100

                            return (
                                <Col span={8}>
                                    <Card className="cardHome" title={`${cand.firstName} ${cand.lastName}`} bordered={false} style={{ textAlign: 'center' }}>
                                        <Avatar size={90} icon={<UserOutlined />} />
                                        <h1 className="percentCard">{percent.toFixed(2)}%</h1>
                                        <h3 className="totalCard">Nombre des votes : {cand.totalVote}</h3>
                                        {(JSON.parse(localStorage.getItem('token')).roles === 'Candidature' || JSON.parse(localStorage.getItem('token')).roles === 'Electeur') && <Button onClick={() => {
                                            setCandName(`${cand.firstName} ${cand.lastName}`)
                                            setIsModalVisible(true)
                                            setUserVotedId(cand._id)
                                        }} disabled={JSON.parse(localStorage.getItem('token')).isVoted} >Voter</Button>}
                                    </Card>
                                </Col>
                            )
                        })}


                    </Row>
                </div>

                <Modal style={{ textAlign: 'center' }} footer={null} title={candName} visible={isModalVisible} onCancel={handleCancel}>
                    {err && <p style={{ color: 'red', textAlign: 'center', fontWeight: 'bold' }}>{err}</p>}

                    <div style={{ textAlign: 'center', margin: "auto" }}>
                        <Reaptcha sitekey="6LfEES0eAAAAAPJYlrZBVWTTcrCWQJxTi3ktPcCF" onVerify={onVerify} />
                    </div>
                    <Button onClick={handleConfirm}>Confirmer le vote</Button>
                </Modal>
            </Layout> : <Navigate to='/' />}
        </div>
    );
}

export default Home;
