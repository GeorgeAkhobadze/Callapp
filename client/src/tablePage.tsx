import { useEffect, useState } from 'react'
import './App.css'
import useStore, { UserInterface } from './store'
import { Button, Table } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import UserModal from './components/UserModal/UserModal'
import { deleteUserAPI, getAllUsersAPI } from './API/API'

const TablePage = () => {
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
            render: (user: UserInterface) => (
                <Button type='link' danger onClick={() => handleUserDelete(user.id)}>
                    <DeleteOutlined />
                </Button>
            ),
        },
    ]

    useEffect(() => {
        getAllUsersAPI()
            .then((res) => store.setUsers(res.data.data))
            .catch((err) => console.log(err))
    }, [])

    const handleUserDelete = (id: any) => {
        deleteUserAPI(id)
            .then((res) => store.setUsers(res.data))
            .catch((err) => console.log(err))
    }

    const handleUserCreate = () => {
        setClickedUser(null)
        setModalOpen(true)
    }

    return (
        <div className='App'>
            <Button type='primary' onClick={() => handleUserCreate()}>
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

export default TablePage
