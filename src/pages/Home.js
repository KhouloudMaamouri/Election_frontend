
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Card, Col, Modal, Row } from "antd";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import Layout from "../components/layout";
import ReCAPTCHA from "react-google-recaptcha";
import Reaptcha from "reaptcha";

const Home = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [captcha, setCaptcha] = useState(false)
    const [err, setErr] = useState()
    const [candName, setCandName] = useState("")

    const handleCancel = () => {
        setIsModalVisible(false);
        window.location.reload()
    };

    const onVerify = (value) => {
        setErr('')
        setCaptcha(true)

    }
    const handleConfirm = () => {
        if (captcha) {

        } else {
            setErr('Vérifier la captcha')
        }

    }

    return (
        <div>
            {localStorage.getItem('token') ? <Layout>
                <p style={{marginTop:"10px", textAlign:'right', fontWeight:'bold'}}>Total des votes : 5000</p>
                <div className="site-card-wrapper">
                    <Row gutter={16}>
                        <Col span={8}>
                            <Card className="cardHome" title="Ameni Maamouri" bordered={false} style={{ textAlign: 'center' }}>
                                <Avatar size={90} icon={<UserOutlined />} />
                                <h1 className="percentCard">20%</h1>
                                <h3 className="totalCard">Nombre des votes : 50</h3>
                               {(JSON.parse(localStorage.getItem('token')).roles === 'Candidature' || JSON.parse(localStorage.getItem('token')).roles === 'Electeur') && <Button onClick={() => {
                                    setCandName("Ameni Maamouri")
                                    setIsModalVisible(true)
                                }} disabled={JSON.parse(localStorage.getItem('token')).isVoted} >Voter</Button>}
                            </Card>
                        </Col>

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