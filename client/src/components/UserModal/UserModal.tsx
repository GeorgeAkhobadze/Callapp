import { Input, Modal, Form, Select, InputNumber, Button } from 'antd'
import { Cities } from '../../assets/data/cities.data'
import axios from 'axios'
import useStore, { UserInterface } from '../../store'
import { FC, useEffect, useState } from 'react'
import { UserFormInterface } from '../../assets/interface/userForm.interface'
import { log } from 'console'
import './userModal.css'

interface Props {
    modalOpen: boolean
    setModalOpen: (a: boolean) => void
    userData?: UserInterface | null
    setUserData: (a: UserInterface | null) => void
}

const UserModal: FC<Props> = ({ modalOpen, setModalOpen, userData, setUserData }) => {
    const store = useStore()
    const [form] = Form.useForm()

    const [loading, setLoading] = useState<boolean>(false)

    const handleUserAdd = async (values: UserFormInterface) => {
        try {
            setLoading(true)
            const { city, street, ...rest } = values
            const body = {
                ...rest,
                address: { city, street },
                phone:
                    '+1' +
                    ' (' +
                    rest?.phone.substring(0, 3) +
                    ')' +
                    ' ' +
                    rest?.phone.substring(3, 6) +
                    '-' +
                    rest?.phone.substring(6),
            }

            if (userData === null) {
                await axios
                    .post('http://localhost:5000/data', body)
                    .then((res) => store.addUser(res.data))
                    .catch((err) => console.log(err))
            } else {
                await axios
                    .put(`http://localhost:5000/data/${userData?.id}`, body)
                    .then((res) => store.setUsers(res.data))
                    .catch((err) => console.log(err))
            }
            setUserData(null)
            setModalOpen(false)
            setLoading(false)
        } catch (err) {
            alert(err)
        }
    }

    useEffect(() => {
        console.log(userData)
        if (userData !== null) {
            form.setFieldsValue({
                ...userData,
                ...userData?.address,
                phone: `${userData?.phone.replace(/\D/g, '').slice(1)}`,
            })
        } else {
            form.resetFields()
        }
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
