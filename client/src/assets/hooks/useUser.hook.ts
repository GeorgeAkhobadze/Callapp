import { GetAllUsers, DeleteUser, UpdateUser, CreateUser } from 'api/user.api'
import { CreateUserInterface } from 'assets/interface/createUser.interface'
import { UserInterface } from 'assets/interface/user.interface'
import useStore from 'store/store'

const useUser = (): {
    handleUserDelete: (id: number) => void
    handleUserFetching: () => Promise<void>
    handleUserUpdate: (id: number, body: CreateUserInterface) => Promise<void>
    handleUserCreation: (body: CreateUserInterface) => Promise<void>
} => {
    const store = useStore()

    const handleUserDelete = (id: number): void => {
        DeleteUser(id)
            .then((res) => store.setUsers(res.data))
            .catch((err) => console.log(err))
    }

    const handleUserFetching = async (): Promise<void> => {
        try {
            if (store.users.length <= 0) {
                const { data }: { data: { data: UserInterface[]; total: number } } = await GetAllUsers()
                store.setUsers(data.data)
            }
        } catch (err) {
            console.log(err)
        }
    }

    const handleUserUpdate = async (id: number, body: CreateUserInterface): Promise<void> => {
        try {
            const { data }: { data: UserInterface[] } = await UpdateUser(id, body)
            store.setUsers(data)
        } catch (err) {
            console.log(err)
        }
    }

    const handleUserCreation = async (body: CreateUserInterface): Promise<void> => {
        try {
            const { data }: { data: UserInterface } = await CreateUser(body)
            store.addUser(data)
        } catch (err) {
            console.log(err)
        }
    }

    return {
        handleUserDelete,
        handleUserFetching,
        handleUserUpdate,
        handleUserCreation,
    }
}

export default useUser
