import { useEffect, useState } from "react";
import Layout from "../components/layout";
import axios from 'axios'
import { Table, Space, Button, Modal } from 'antd';
import { Link, Navigate } from "react-router-dom";
import { DatePicker, Form, Input, Select } from "antd";
import dayjs from "dayjs";

const { Option } = Select;

const TimeSheet = () => {

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [timesheet, setTimesheet] = useState()
    const [timesheetId, setTimesheetId] = useState()

    const showModal = (id) => {
        axios.get(`http://127.0.0.1:8000/getTimeSheet/${id}`).then(res => {
            setTimesheet(res.data)
            setTimesheetId(id)
            setOperation(res.data.operation)
            setIsModalVisible(true);
        }).catch(err => console.log(err))

    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        window.location.reload()
    };

    const [operation, setOperation] = useState('')
    const [employeeList, setEmployeeList] = useState()

    const handleDelete = (id) => {
        axios.delete(`http://127.0.0.1:8000/timeSheet/${id}`).then(res => {
            window.location.reload()
        }).catch(err => console.log(err))
    }

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/employee').then(res => {
            setEmployeeList(res.data)
        }).catch(err => console.log(err))
    }, [])

    const onFinish = (values) => {
        console.log('vl', values)

        if (operation === "Autre") {
            const data = {
                ...values,
                id: timesheetId,
                methode: "-",
                maladie: "-",
                stadeMaladie: "-",
                observation: "-",

            }

            axios.post('http://127.0.0.1:8000/timeSheet/update', data).then(res => {
                window.location.reload()
            }).catch(err => console.log(err))
        } else {
            const data = {
                ...values,
                id: timesheetId,
            }

            axios.post('http://127.0.0.1:8000/timeSheet/update', data).then(res => {
                window.location.reload()
            }).catch(err => console.log(err))
        }



    };
    const dateFormat = 'DD-MM-YYYY';
    let columns
    if (localStorage.getItem('token')) {
        if (JSON.parse(localStorage.getItem('token')).role === 'exploitation') {
            columns = [
                {
                    title: 'Employee Id',
                    dataIndex: 'employeeId',
                    key: 'employeeId',
                },
                {
                    title: 'Spent Time',
                    dataIndex: 'spenTime',
                    key: 'spenTime',
                },
                {
                    title: 'Maladie',
                    dataIndex: 'maladie',
                    key: 'maladie',
                },
                {
                    title: 'Methode',
                    dataIndex: 'methode',
                    key: 'methode',
                },
                {
                    title: 'Operation',
                    dataIndex: 'operation',
                    key: 'operation',
                },
                {
                    title: 'Stade Maladie',
                    dataIndex: 'stadeMaladie',
                    key: 'stadeMaladie',
                },
                {
                    title: 'Observation',
                    dataIndex: 'observation',
                    key: 'observation',
                },
                {
                    title: 'Date',
                    dataIndex: 'date',
                    key: 'date',
                },

                {
                    title: 'Action',
                    key: 'action',
                    render: (text, record) => (
                        <Space size="middle">
                            <a onClick={() => showModal(record.id)}>Update </a>
                            <a onClick={() => handleDelete(record.id)}>Delete</a>
                        </Space>
                    ),
                },
            ];

        } else {
            columns = [
                {
                    title: 'Employee Id',
                    dataIndex: 'employeeId',
                    key: 'employeeId',
                },
                {
                    title: 'Spent Time',
                    dataIndex: 'spenTime',
                    key: 'spenTime',
                },
                {
                    title: 'Maladie',
                    dataIndex: 'maladie',
                    key: 'maladie',
                },
                {
                    title: 'Methode',
                    dataIndex: 'methode',
                    key: 'methode',
                },
                {
                    title: 'Operation',
                    dataIndex: 'operation',
                    key: 'operation',
                },
                {
                    title: 'Stade Maladie',
                    dataIndex: 'stadeMaladie',
                    key: 'stadeMaladie',
                },
                {
                    title: 'Observation',
                    dataIndex: 'observation',
                    key: 'observation',
                },
                {
                    title: 'Date',
                    dataIndex: 'date',
                    key: 'date',
                },

            ];
        }
    }


    const [timesheetList, setTimesheetList] = useState()

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/timeSheets').then(res => {
            setTimesheetList(res.data.reverse())
        }).catch(err => console.log(err))
    }, [])

    const onChangePicker = (val) => {
        const data = dayjs(val).format('DD-MM-YYYY')
        if(val){
            axios.get(`http://127.0.0.1:8000/timeSheet/${data}`).then(res => {
                setTimesheetList(res.data.reverse())
            }).catch(err => console.log(err))
           
        }else{
          
            axios.get('http://127.0.0.1:8000/timeSheets').then(res => {
                setTimesheetList(res.data.reverse())
            }).catch(err => console.log(err))
        }
      
    }


    return (
        <div>
            {localStorage.getItem('token') ? <Layout>
                {JSON.parse(localStorage.getItem('token')).role === 'exploitation' && <Link to='/create-timesheet'><Button style={{ textAlign: 'right', display: 'block', marginTop: "20px", color: 'green', cursor: 'pointer' }}>Add Timesheet</Button></Link>}

                <h1 style={{ textAlign: 'center', marginTop: "20px", marginBottom: '40px' }}>Timesheet List</h1>
                <div style={{ width: '250px', display: 'flex', marginBottom: '20px', justifyContent:'space-between', alignItems:'center' }}>
                    <p style={{marginTop:'10px', fontWeight:'bold'}}>Date :</p>
                    <DatePicker style={{ width: '200px' }} onChange={onChangePicker} />
                </div>

                {timesheetList && <Table dataSource={timesheetList} columns={columns} pagination={false} />}

            </Layout> : <Navigate to="/" />}
            <Modal footer={null} title="Update Timesheet" visible={isModalVisible} onCancel={handleCancel}>

                <Form
                    initialValues={timesheet}
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
                        label="Date"
                        name="date"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Date',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>



                    <Form.Item style={{ marginLeft: 'auto', marginRight: 'auto', marginTop: '50px', marginBottom: '-30px', textAlign: 'center' }}>
                        <Button style={{ marginRight: '20px' }} onClick={handleCancel} key="cancel" >
                            Cancel
                        </Button>
                        <Button type='primary' htmlType='submit' key="schedule">Save</Button>
                    </Form.Item>

                </Form>
            </Modal>
        </div>
    );
}

export default TimeSheet;