import { Button } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'

import { UserInterface } from 'assets/interface/user.interface'
import useUser from './useUser.hook'

interface ColumnInterface {
    title: string
    key: string
    dataIndex?: string | string[]
    render?: (a: UserInterface) => JSX.Element
}

const useTableStructure = (): { columns: ColumnInterface[] } => {
    const { handleUserDelete } = useUser()

    const columns: ColumnInterface[] = [
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
                <Button type='link' danger onClick={() => handleUserDelete(user?.id)}>
                    <DeleteOutlined />
                </Button>
            ),
        },
    ]

    return { columns }
}

export default useTableStructure
