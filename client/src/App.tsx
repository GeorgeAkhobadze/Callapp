import React, { useEffect, useState } from 'react'
import logo from './logo.svg'
import './App.css'

import useStore, { UserInterface } from './store'
import { Input, Button, Table, Modal, Form, Select, InputNumber } from 'antd'
import axios from 'axios'
import { DeleteOutlined } from '@ant-design/icons'
import UserModal from './components/UserModal/UserModal'

function App() {
    const store = useStore()

    const [modalOpen, setModalOpen] = useState<boolean>(false)
    const [clickedUser, setClickedUser] = useState<UserInterface | null>(null)

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

    useEffect(() => {
        console.log(clickedUser)
    }, [clickedUser])
    useEffect(() => {
        axios
            .get('http://localhost:5000/data')
            .then((res) => store.setUsers(res.data.data))
            .catch((err) => console.log(err))
    }, [])

    return (
        <div className='App'>
            <Button type='primary' onClick={() => setModalOpen(true)}>
                Create User
            </Button>

            <Table
                dataSource={store.users}
                columns={columns}
                onRow={(record, rowIndex) => {
                    return {
                        onDoubleClick: (event) => {
                            setModalOpen(true)
                            // @ts-ignore
                            setClickedUser(record)
                        },
                    }
                }}
            />

            <UserModal
                modalOpen={modalOpen}
                setModalOpen={setModalOpen}
                userData={clickedUser}
                setUserData={setClickedUser}
            />
        </div>
    )
}

export default App
