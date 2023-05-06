import { FC, useEffect, useState } from 'react'
import { Input, Modal, Form, Select, Button, notification } from 'antd'

import './UserModal.css'

import { UserFormInterface } from 'assets/interface/userForm.interface'
import { UserInterface } from 'assets/interface/user.interface'
import { Cities } from 'assets/data/cities.data'
import useUser from 'assets/hooks/useUser.hook'
import { formatPhone, parseNumber } from 'assets/helpers/formatPhone.helper'

interface Props {
    modalOpen: boolean
    setModalOpen: (a: boolean) => void
    userData?: UserInterface | null
    setUserData: (a: UserInterface | null) => void
}

const UserModal: FC<Props> = ({ modalOpen, setModalOpen, userData, setUserData }) => {
    const [form] = Form.useForm()
    const { handleUserUpdate, handleUserCreation } = useUser()

    const [loading, setLoading] = useState<boolean>(false)

    const handleUserAdd = async (values: UserFormInterface) => {
        try {
            setLoading(true)
            const { city, street, phone, ...rest } = values
            const body = {
                ...rest,
                address: { city, street },
                phone: formatPhone(phone),
            }

            if (userData === null) await handleUserCreation(body)
            else if (userData !== null && userData?.id) await handleUserUpdate(userData?.id, body)
            setModalOpen(false)
            setUserData(null)
        } catch (err) {
            notification['error']({
                message: 'Error',
                description: 'There was a problem while creating the user.',
            })
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (userData !== null && typeof userData !== 'undefined')
            form.setFieldsValue({
                ...userData,
                ...userData?.address,
                phone: parseNumber(userData?.phone),
            })
        else form.resetFields()
    }, [userData])

    return (
        <Modal
            title={`${userData === null ? 'Create' : 'Edit'} User`}
            open={modalOpen}
            onCancel={() => setModalOpen(false)}
            footer={null}
        >
            <Form name='userform' onFinish={handleUserAdd} layout='vertical' form={form}>
                <Form.Item label='Name' name='name' rules={[{ required: true, message: 'Please input your Name.' }]}>
                    <Input placeholder='Name' />
                </Form.Item>

                <Form.Item label='Email' name='email' rules={[{ required: true, message: 'Please input your Email.' }]}>
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
                            len: 10,
                            message: 'Please enter a valid Phone Number',
                        },
                    ]}
                >
                    <Input placeholder='(123) 345-4322' addonBefore='+1' />
                </Form.Item>

                <Form.Item label='City' name='city' rules={[{ required: true, message: 'Please input your City.' }]}>
                    <Select placeholder='City' options={Cities} />
                </Form.Item>

                <Form.Item
                    label='Street'
                    name='street'
                    rules={[{ required: true, message: 'Please input your Street.' }]}
                >
                    <Input placeholder='Street' />
                </Form.Item>

                <Form.Item>
                    <Button type='primary' htmlType='submit' loading={loading}>
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default UserModal
