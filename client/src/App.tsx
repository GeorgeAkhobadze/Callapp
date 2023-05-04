import React, { useEffect, useState } from 'react'
import logo from './logo.svg'
import './App.css'

import { Cities } from './assets/data/cities.data'

import useStore, { UserInterface } from './store'
import { Input, Button, Table, Modal, Form, Select, InputNumber } from 'antd'
import axios from 'axios'
import { DeleteOutlined } from '@ant-design/icons'

function App() {
    const store = useStore()

    const [name, setName] = useState<string>('')
    const [modalOpen, setModalOpen] = useState<boolean>(false)

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Gender',
            dataIndex: 'gender',
            key: 'gender',
        },
        {
            title: 'Street',
            dataIndex: ['address', 'street'],
            key: 'street',
        },
        {
            title: 'City',
            dataIndex: ['address', 'city'],
            key: 'city',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text: string, user: UserInterface) => (
                <Button type='link' danger onClick={() => handleUserDelete(user.id)}>
                    <DeleteOutlined />
                </Button>
            ),
        },
    ]

    const handleUserDelete = async (id: any) => {
        await axios.delete(`http://localhost:5000/data/${id}`).then((res) => store.setUsers(res.data))
    }

    const handleUserAdd = async (values: any) => {
        await axios
            .post('http://localhost:5000/data', {
                name: values.name,
                email: values.email,
                gender: values.gender,
                address: {
                    street: values.email,
                    city: values.city,
                },
                phone: `+1 ${values.phone}`,
            })
            .then((res) => store.addUser(res.data))
            .catch((err) => console.log(err))
    }

    const handleUserUpdate = async (values: any) => {
        await axios
            .put('http://localhost:5000/data/18', {
                name: values.name,
                email: values.email,
                gender: values.gender,
                address: {
                    street: values.email,
                    city: values.city,
                },
                phone: `+1 ${values.phone}`,
            })
            .then((res) => console.log(res))
            .catch((err) => console.log(err))
    }

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo)
    }

    useEffect(() => {
        axios
            .get('http://localhost:5000/data')
            .then((res) => store.setUsers(res.data.data))
            .catch((err) => console.log(err))
    }, [])

    return (
        <div className='App'>
            {/* <Input placeholder='Enter user name' value={name} onChange={(e) => setName(e.target.value)} /> */}
            {/* <Button
                type='primary'
                onClick={() =>
                    void (async () => {
                        await handleUserAdd()
                    })()
                }
            >
                CLICK
            </Button> */}
            <Button type='primary' onClick={() => setModalOpen(true)}>
                Create User
            </Button>
            <Modal title='Create A New User' open={modalOpen} onCancel={() => setModalOpen(false)}>
                <Form name='userform' onFinish={handleUserAdd} onFinishFailed={onFinishFailed} layout='vertical'>
                    <Form.Item
                        label='Name'
                        name='name'
                        rules={[{ required: true, message: 'Please input your Name.' }]}
                    >
                        <Input placeholder='Name' />
                    </Form.Item>

                    <Form.Item
                        label='Email'
                        name='email'
                        rules={[{ required: true, message: 'Please input your Email.' }]}
                    >
                        <Input placeholder='Email' type='email' />
                    </Form.Item>

                    <Form.Item
                        label='Gender'
                        name='gender'
                        rules={[{ required: true, message: 'Please input your Gender.' }]}
                    >
                        <Select
                            placeholder='Gender'
                            options={[
                                { value: 'male', label: 'Male' },
                                { value: 'female', label: 'Female' },
                            ]}
                        />
                    </Form.Item>

                    <Form.Item
                        label='Phone Number'
                        name='phone'
                        rules={[
                            { required: true, message: 'Please input your Phone Number.' },
                            {
                                pattern: /^(?:\d*)$/,
                                message: 'Please enter a valid Phone Number',
                            },
                            {
                                pattern: /^[\d]{0,10}$/,
                                message: 'Please enter a valid Phone Number',
                            },
                        ]}
                    >
                        <InputNumber placeholder='(123) 345-4322' controls={false} width={400} addonBefore='+1' />
                    </Form.Item>

                    <Form.Item
                        label='City'
                        name='city'
                        rules={[{ required: true, message: 'Please input your City.' }]}
                    >
                        <Select placeholder='City' options={Cities} />
                    </Form.Item>

                    <Form.Item
                        label='Street'
                        name='street'
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input placeholder='Street' />
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type='primary' htmlType='submit'>
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>

            <Table dataSource={store.users} columns={columns} />
        </div>
    )
}

export default App
