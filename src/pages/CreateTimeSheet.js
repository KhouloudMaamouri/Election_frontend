import Layout from "../components/layout"
import { Button, DatePicker, Form, Input, Select } from "antd";
import { useEffect, useState } from "react";
import axios from 'axios'
import dayjs from 'dayjs'
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const { Option } = Select;

const CreateTimeSheet = () => {
    const navigate = useNavigate()
    const [operation, setOperation] = useState('')
    const [employeeList, setEmployeeList] = useState()

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/employee').then(res => {

            setEmployeeList(res.data)
        }).catch(err => console.log(err))
    }, [])

    const onFinish = (values) => {

        if (operation === "Autre") {
            const data = {
                ...values,
                id: 0,
                methode: "-",
                maladie: "-",
                stadeMaladie: "-",
                observation: "-",
                date: dayjs(values.date).format('DD-MM-YYYY')
            }

            axios.post('http://127.0.0.1:8000/timeSheet/create', data).then(res => {
                navigate('/timesheet')
            }).catch(err => console.log(err))
        } else {
            const data = {
                ...values,
                date: dayjs(values.date).format('DD-MM-YYYY'),
                id: 0,
            }

            axios.post('http://127.0.0.1:8000/timeSheet/create', data).then(res => {
                navigate('/timesheet')
            }).catch(err => console.log(err))
        }



    };


    return (
        <div>
            {localStorage.getItem('token') ? <Layout>
                <h1 style={{ textAlign: 'center', marginTop: "20px" }}>Add Timesheet</h1>
                <Form
                    className='createEmlpoyeContainer'
                    name="basic"
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    {employeeList && <Form.Item
                        name="employeeId"
                        label="Employee"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Employee!',
                            },
                        ]}
                    >
                        <Select>
                            {employeeList.map(item => {
                                return (
                                    <Option key={item.id} value={item.id}>{item.firstName} {item.lastName}</Option>
                                )
                            })}


                        </Select>
                    </Form.Item>}

                    <Form.Item
                        label="Spent Time"
                        name="spenTime"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Spent Time!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="operation"
                        label="Operations"

                        rules={[
                            {
                                required: true,
                                message: "Please input your operation!"
                            },
                        ]}
                    >
                        <Select onChange={(val) => setOperation(val)}>
                            <Option value="Phytosanitaire">Phytosanitaire</Option>
                            <Option value="Autre">Autre</Option>
                        </Select>
                    </Form.Item>

                    {operation === "Phytosanitaire" && <div>
                        <Form.Item
                            label="List Maladies"
                            name="maladie"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Maladies',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Methode"
                            name="methode"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your methode',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Observation"
                            name="observation"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your observation',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Stade Maladie"
                            name="stadeMaladie"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Stade Maladie',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                    </div>}
                    <Form.Item
                        name="date"
                        label="Date"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Date',
                            },
                        ]} >
                        <DatePicker />
                    </Form.Item>

                    <Form.Item

                    >
                        <Button htmlType="submit">
                            Add Timesheet
                        </Button>
                    </Form.Item>
                </Form>
            </Layout>
                : <Navigate to='/' />}
        </div>

    )
}

export default CreateTimeSheet