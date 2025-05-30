import { User } from "../../../domain/entities/User";
import { IHashProvider } from "../../../domain/interfaces/IHashProvider";
import { IUserRepository } from "../../../domain/repositories/UserRepository";
import { AppError } from "../../../utils/AppError";
import { CreateUserDTO } from "./CreateUserDTO";

export class CreateUserUseCase{
    constructor(
        private userRepository: IUserRepository,
        private createBcryptHash: IHashProvider
    ){}

    async execute({ name, email, password, role}: CreateUserDTO){
        const userExist =  await this.userRepository.findByEmail(email)

        if(userExist){
            throw new AppError("User exist")
        }

        const passwordHash =   await this.createBcryptHash.hash(password)

        const user = new User({ name,email, passwordHash, role})

        await this.userRepository.save(user)
    }
}