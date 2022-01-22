import Layout from "../components/layout"
import { Button, Form, Input, Select } from "antd";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import {useState} from 'react'
const { Option } = Select;
const CreateUser = () => {
    const navigate = useNavigate()
    const [err, setErr] = useState('')

    const onFinish = (values) => {
        console.log('values', values)
        axios.post(`${process.env.REACT_APP_ENDPPOINT}/signup`, values).then(res => {
            navigate('/users')
        }).catch(err => setErr('Cin exist déja !'))
    };
    return (
        <div>
              {localStorage.getItem('token') ?
            <Layout>
                <h1 style={{textAlign:'center', marginTop:"20px"}}>Ajouter un utilisateur</h1>
                {err && <p style={{fontSize:'20px',color:'red', fontWeight:'bold', textAlign:'center', marginTop:'10px'}}>{err}</p>}
                <Form
                   className='createEmlpoyeContainer'
                    name="basic"
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



                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>


                    <Form.Item

                    >
                        <Button htmlType="submit">
                            Ajouter utilisateur
                        </Button>
                    </Form.Item>
                </Form>
            </Layout> : <Navigate to='/' /> }
        </div>
    )
}

export default CreateUser
