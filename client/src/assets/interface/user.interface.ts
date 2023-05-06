export interface UserInterface {
    id: number
    email: string
    name: string
    phone: string
    gender: string
    address: {
        street: string
        city: string
    }
}
