import { create } from 'zustand'

import { UserInterface } from 'assets/interface/user.interface'

export const addUser = (todos: UserInterface[], user: UserInterface): UserInterface[] => [...todos, user]

type Store = {
    users: UserInterface[]
    addUser: (a: UserInterface) => void
    setUsers: (a: UserInterface[]) => void
}

const useStore = create<Store>((set) => ({
    users: [],

    setUsers(users: UserInterface[]) {
        set((state) => ({
            ...state,
            users,
        }))
    },

    addUser(user: UserInterface) {
        set((state) => ({
            ...state,
            users: addUser(state.users, user),
        }))
    },
}))

export default useStore
