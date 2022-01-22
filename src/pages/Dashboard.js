import { useEffect, useState } from 'react'
import Layout from '../components/layout/index'
import axios from 'axios'
import { Table, Space, Modal } from 'antd';
import { UserAddOutlined } from '@ant-design/icons';
import { Link, Navigate } from 'react-router-dom';
import { Button, DatePicker, Form, Input, Select } from "antd";

const Dashboard = () => {

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [employeeById, setEmployeeById] = useState()
    const [employeeId, setEmployeeId] = useState()


    const showModal = (id) => {
        setEmployeeId(id)
        axios.get(`http://127.0.0.1:8000/employee/${id}`).then(res => {
            setEmployeeById(res.data)
            setIsModalVisible(true);
        }).catch(err => console.log(err))
    };

  

    const handleCancel = () => {
        setIsModalVisible(false);
        window.location.reload()
    };

    const columns = [
        {
            title: 'id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'FirstName',
            dataIndex: 'firstName',
            key: 'firstName',
        },
        {
            title: 'LastName',
            dataIndex: 'lastName',
            key: 'lastName',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <a onClick={() => showModal(record.id)}>Update</a>
                    <a onClick={() => handleDelete(record.id)}>Delete</a>
                </Space>
            ),
        },
    ];

    const [employeeList, setEmployeeList] = useState()

    const handleDelete = (id) => {
        axios.delete(`http://127.0.0.1:8000/employee/${id}`).then(res => {
            window.location.reload()
        }).catch(err => console.log(err))
    }

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/employee').then(res => {
            setEmployeeList(res.data.reverse())
        }).catch(err => console.log(err))
    }, [])

    const onFinish = (values) => {
        const data = {
            ...values,
            id: employeeId
        }
      
            axios.post('http://127.0.0.1:8000/employee/update', data ).then(res => {
              window.location.reload()
            }).catch(err => console.log(err))

    };

    return (
        <div>
            {localStorage.getItem('token') ? <Layout>
                <Link to='/create-employe'><UserAddOutlined style={{ textAlign: 'right', display: 'block', marginTop: "20px", fontSize: "25px", color: 'green', cursor: 'pointer' }} /></Link>
                <h1 style={{ textAlign: 'center', marginTop: "20px", marginBottom: '40px' }}>Employee List</h1>
                {employeeList && <Table dataSource={employeeList} columns={columns} pagination={false} />}
            </Layout> : <Navigate to='/' />}
            <Modal footer={null} title="Update Employee" visible={isModalVisible} onCancel={handleCancel}>
                <Form

                    /*    className='createEmlpoyeContainer' */
                    name="basic"
                    initialValues={employeeById}
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Firstname"
                        name="firstName"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your firstname!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Lastname"
                        name="lastName"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your lastname',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item style={{marginLeft:'auto',marginRight:'auto', marginTop:'50px', marginBottom:'-30px',textAlign:'center'}}>
                        <Button style={{marginRight:'20px'}} onClick={handleCancel} key="cancel" >
                            Cancel
                        </Button>
                        <Button type='primary' htmlType='submit' key="schedule">Save</Button>
                    </Form.Item>

                </Form>
            </Modal>
         </div >
    )
}
export default Dashboard