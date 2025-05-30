import { randomUUID } from "node:crypto"
import { UserRole } from "../enums/UserRole"

type UserProps = {
    name: string
    email: string
    passwordHash: string
    role: UserRole
}


export class User{
    public readonly id: string

    public name: string
    public email: string
    public passwordHash: string
    public role: UserRole

    constructor({ name, email, passwordHash,  role }: UserProps, id?: string){
        this.id = id ?? randomUUID()
        this.name = name
        this.email = email
        this.passwordHash = passwordHash
        this.role = role ?? UserRole.CLIENT
    }
}