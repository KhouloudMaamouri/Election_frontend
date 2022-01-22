import { Button, Form, Input, Select } from "antd";
import axios from 'axios'
import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
const { Option } = Select;
const SignUp = () => {

    let navigate = useNavigate();
    const [err, setErr] = useState()

    const onFinish = (values) => {
         axios.post(`${process.env.REACT_APP_ENDPPOINT}/signup`, values).then(res => {
             localStorage.setItem('token', JSON.stringify(res.data))
             navigate('/')
         }).catch(err => setErr('Cin existe'))
        /* to connexion page if success */

    };

    return (
        <div className="loginContainerForm">
            <h1 style={{ textAlign: "center" }}>S'enregistrer</h1>
            <Form
                className="loginContainer"
                name="basic"
                onFinish={onFinish}
                autoComplete="off"
            >
                {err && <p style={{ fontWeight: 'bold', color: 'red', marginBottom: '20px' }}>{err}</p>}
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
                        Submit
                    </Button>
                </Form.Item>
                <p className="linkAuth"><Link to='/'>Se connecter</Link></p>
            </Form>
            <p style={{ textAlign: "center" }}>Tous les droits sont réservés - Khouloud MAAMOURI / Saif BEJAOUI - M2 2021/2022</p>
        </div>
    );
}

export default SignUp;