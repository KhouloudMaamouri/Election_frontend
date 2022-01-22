import Layout from "../components/layout"
import { Button, DatePicker, Form, Input, notification, Select } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { useEffect } from "react";
import { useState } from "react/cjs/react.development";
import axios from 'axios'
import { Navigate } from "react-router-dom";

const { Option } = Select;

const Notification = () => {

    const [users, setUsers] = useState()

    const onFinish = (values) => {
        axios.post('http://127.0.0.1:8000/sendMail', values).then(res => {
           
            notification['success']({
                message: 'Email send successfully',
              });

              /* redirect to graph */ 
        }).catch(err => console.log(err))
    }

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/users`).then(res => {
            const employee = res.data.filter(item => item.role !== JSON.parse(localStorage.getItem('token')).role)
            setUsers(employee)
        }).catch(err => console.log(err))
    }, [])

    return (
        <div>
           {localStorage.getItem('token') ?  <Layout>
                <h1 style={{ textAlign: 'center', marginTop: "20px", marginBottom: '40px' }}>Send Notification</h1>
                <Form
                    className='createEmlpoyeContainer'
                    name="basic"
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    {users && <Form.Item
                        name="destinations"
                        label="Destinations"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Employee!',
                            },
                        ]}
                    >
                        <Select
                            mode="multiple"

                            style={{ width: '100%' }}
                        >
                           
                           {users.map(user => (
                                <Option value={user.email} >{user.email}</Option>
                           ))}
                        </Select>


                    </Form.Item>}


                    <Form.Item
                        label="Title"
                        name="subject"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your title!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>



                    <Form.Item
                        label="Message"
                        name="message"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Maladies',
                            },
                        ]}
                    >
                        <TextArea style={{ height: '200px' }} />
                    </Form.Item>


                    <Form.Item

                    >
                        <Button htmlType="submit">
                            Send Notification
                        </Button>
                    </Form.Item>
                </Form>
            </Layout> : <Navigate to='/' />}
        </div>
    )
}

export default Notification