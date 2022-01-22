import Layout from "../components/layout"
import { Button, Form, Input } from "antd";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
const CreateEmploye = () => {
    const navigate = useNavigate()
    const onFinish = (values) => {
    const data = {
        ...values,
        id: 0
    }
  
        axios.post('http://127.0.0.1:8000/employee/register', data ).then(res => {
            navigate('/employe')
        }).catch(err => console.log(err))
    };
    return (
        <div>
          {localStorage.getItem('token') ?   <Layout>
                <h1 style={{textAlign:'center', marginTop:"20px"}}>Add Employee</h1>
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

                    >
                        <Button htmlType="submit">
                            Add Employee
                        </Button>
                    </Form.Item>
                </Form>
            </Layout> : <Navigate to='/' />}
        </div>
    )
}

export default CreateEmploye