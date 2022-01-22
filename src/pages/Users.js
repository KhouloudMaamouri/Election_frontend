import { useEffect, useState } from "react";
import Layout from "../components/layout";
import axios from 'axios'
import { Table, Space, Button, Modal } from 'antd';
import { Link, Navigate } from "react-router-dom";
import { DatePicker, Form, Input, Select } from "antd";
import dayjs from "dayjs";

const { Option } = Select;

const Users = () => {

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [user, setUser] = useState()
    const [userId, setUserId] = useState()
    const [userList, setUserList] = useState()
    const [err,setErr] = useState()

    const showModal = (id) => {
        axios.get(`${process.env.REACT_APP_ENDPPOINT}/users/${id}`).then(res => {
            setUser(res.data.user)
            setUserId(res.data.user._id)
            setIsModalVisible(true);
        }).catch(err => console.log(err))

    };

    const handleCancel = () => {
        setIsModalVisible(false);
        window.location.reload()
    };


    const handleDelete = (id) => {
        axios.delete(`${process.env.REACT_APP_ENDPPOINT}/users/${id}`).then(res => {
            window.location.reload()
        }).catch(err => console.log(err))
    }

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_ENDPPOINT}/users`).then(res => {
            setUserList(res.data.user.reverse())
        }).catch(err => console.log(err))
    }, [])

    const onFinish = (values) => {
        /*   axios.post('http://127.0.0.1:8000/timeSheet/update', data).then(res => {
              window.location.reload()
          }).catch(err => console.log(err)) */
          axios.patch(`${process.env.REACT_APP_ENDPPOINT}/users/${userId}`, values).then(res => {
            window.location.reload()
        }).catch(err => setErr('Cin exist déja'))

    };

    let columns = [
        {
            title: 'Cin',
            dataIndex: 'cinId',
            key: 'cinId',
        },
        {
            title: 'Prénom',
            dataIndex: 'firstName',
            key: 'firstName',
        },
        {
            title: 'Nom',
            dataIndex: 'lastName',
            key: 'lastName',
        },
        {
            title: 'Role',
            dataIndex: 'roles',
            key: 'roles',
        },


        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <a onClick={() => showModal(record._id)}>Update </a>
                    <a onClick={() => handleDelete(record._id)}>Delete</a>
                </Space>
            ),
        },
    ];


    const onChangeRole = (val) => {
        if (val) {
            axios.get(`${process.env.REACT_APP_ENDPPOINT}/users?roles=${val}`).then(res => {
                setUserList(res.data.user.reverse())
            }).catch(err => console.log(err))
        } else {
            axios.get(`${process.env.REACT_APP_ENDPPOINT}/users`).then(res => {
                setUserList(res.data.user.reverse())
            }).catch(err => console.log(err))
        }

    }


    return (

        <div>
            {localStorage.getItem('token') ? <div> <Layout>
                <Link to='/create-user'><Button style={{ textAlign: 'right', display: 'block', marginTop: "20px", color: 'green', cursor: 'pointer' }}>Ajouter un utilisateur</Button></Link>

                <h1 style={{ textAlign: 'center', marginTop: "20px", marginBottom: '40px' }}>Liste des utilisateurs</h1>
                <div style={{ width: '250px', display: 'flex', marginBottom: '20px', justifyContent: 'space-between', alignItems: 'center' }}>
                    <p style={{ marginTop: '10px', fontWeight: 'bold' }}>Role :</p>
                    <Select style={{ width: '200px' }} onChange={onChangeRole} allowClear>
                        <Option value="Candidature">Candidature</Option>
                        <Option value="Electeur">Electeur</Option>

                    </Select>

                </div>

                {userList && <Table dataSource={userList} columns={columns} pagination={false} />}

            </Layout>
                <Modal footer={null} title="Update User" visible={isModalVisible} onCancel={handleCancel}>
            {err && <p style={{fontWeight:'bold', textAlign:'center', color:'red', fontSize:"16px", marginTop:'10px'}}>{err}</p>}
                    {user && <Form
                        initialValues={user}
                        name="basic"
                        onFinish={onFinish}
                        autoComplete="off"
                    >

                        <Form.Item
                            label="FirstName"
                            name="firstName"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your email!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="LastName"
                            name="lastName"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your email!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Cin"
                            name="cinId"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your email!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Role"
                            name="roles"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your email!',
                                },
                            ]}
                        >
                            <Select style={{ width: '100%' }} >
                                <Option value="Candidature">Candidature</Option>
                                <Option value="Electeur">Electeur</Option>

                            </Select>
                        </Form.Item>


                        <Form.Item style={{ marginLeft: 'auto', marginRight: 'auto', marginTop: '50px', marginBottom: '-30px', textAlign: 'center' }}>
                            <Button style={{ marginRight: '20px' }} onClick={handleCancel} key="cancel" >
                                Cancel
                            </Button>
                            <Button type='primary' htmlType='submit' key="schedule">Save</Button>
                        </Form.Item>

                    </Form>}

                </Modal> </div> : < Navigate to='/' />}

        </div>
    );
}

export default Users;