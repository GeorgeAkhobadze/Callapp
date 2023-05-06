export interface CreateUserInterface {
    email: string
    name: string
    phone: string
    gender: string
    address: {
        street: string
        city: string
    }
}
