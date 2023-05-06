import { AxiosResponse } from 'axios'

import { API } from 'api'
import { CreateUserInterface } from 'assets/interface/createUser.interface'

export const GetAllUsers = async (): Promise<AxiosResponse> => await API.get('/user')

export const DeleteUser = async (id: number): Promise<AxiosResponse> => await API.delete(`/user/${id}`)

export const CreateUser = async (body: CreateUserInterface): Promise<AxiosResponse> => await API.post('/user', body)

export const UpdateUser = async (id: number, body: CreateUserInterface): Promise<AxiosResponse> =>
    await API.put(`/user/${id}`, body)
