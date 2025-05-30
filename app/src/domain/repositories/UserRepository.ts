import { User } from "../entities/User";

export interface IUserRepository{
    findByEmail(email: string): Promise<User | null>
    findById(id: string): Promise<User | null>
    findAll(): Promise<User[]>
    update(user: User): Promise<void>
    delete(user: User): Promise<void>
    save(user: User): Promise<void>   
}