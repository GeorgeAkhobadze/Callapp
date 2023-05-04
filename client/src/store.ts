
import { create } from 'zustand'

  export interface UserInterface {
    city: any;
    id?: number,
    email: string,
    name: string,
    phone: string,
    gender: string,
    address: {
      street: string,
      city: string,
    }
  }

  export const addUser = (todos: UserInterface[], user: UserInterface): UserInterface[] => [
    ...todos,
    user,
  ];    


type Store = {
  users: UserInterface[];
  addUser: (a: UserInterface) => void;
  setUsers: (a: UserInterface[]) => void
}

const useStore = create<Store>((set) => ({
    users: [],
    setUsers(users: UserInterface[]) {
      set(
        state => ({
          ...state,
          users,
        })
      )
    },
    addUser(user: UserInterface) {
        set(state => ({
            ...state,
            users: addUser(state.users, user),
        }))
    },
    deleteUser(users: UserInterface[])
}))



export default useStore;