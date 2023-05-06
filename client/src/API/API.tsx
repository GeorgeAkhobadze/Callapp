import axios from 'axios'
import useStore, { UserInterface } from '../store'

export const BASE_URL = 'http://localhost:5000/data/'
export const deleteUserAPI = async (id: number) => {
    const result = await axios.delete(`${BASE_URL + id}`)
    return result
}

export const getAllUsersAPI = async () => {
    const result = await axios.get(`${BASE_URL}`)
    return result
}

export const addUserAPI = async (data: UserInterface) => {
    const result = await axios.post(`${BASE_URL}`, data)
    return result
}

export const updateUserAPI = async (id: number, data: UserInterface) => {
    const result = await axios.put(`${BASE_URL + id}`, data)

    return result
}
