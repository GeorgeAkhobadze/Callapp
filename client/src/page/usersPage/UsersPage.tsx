import { FC, useEffect, useState } from 'react'
import { Button, Table } from 'antd'

import * as Styled from './StyledUsersPage'
import UserModal from 'components/userModal/UserModal'

import { UserInterface } from 'assets/interface/user.interface'
import useStore from 'store/store'
import useTableStructure from 'assets/hooks/useTableStructure.hook'
import useUser from 'assets/hooks/useUser.hook'

const UsersPage: FC = () => {
    const store = useStore()
    const { handleUserFetching } = useUser()
    const { columns } = useTableStructure()

    const [modalOpen, setModalOpen] = useState<boolean>(false)
    const [clickedUser, setClickedUser] = useState<UserInterface | null>(null)

    const handleUserCreation = (): void => {
        setClickedUser(null)
        setModalOpen(true)
    }

    useEffect(() => {
        handleUserFetching()
    }, [])

    return (
        <Styled.Wrapper>
            <Table
                dataSource={store.users}
                columns={columns}
                pagination={{ showSizeChanger: false }}
                onRow={(record, rowIndex) => {
                    return {
                        onDoubleClick: (event) => {
                            setModalOpen(true)
                            setClickedUser(record)
                        },
                    }
                }}
            />

            <Styled.ButtonWrapper>
                <Button type='primary' size={'large'} onClick={handleUserCreation}>
                    Create New User
                </Button>
            </Styled.ButtonWrapper>

            <UserModal
                modalOpen={modalOpen}
                setModalOpen={setModalOpen}
                userData={clickedUser}
                setUserData={setClickedUser}
            />
        </Styled.Wrapper>
    )
}

export default UsersPage
