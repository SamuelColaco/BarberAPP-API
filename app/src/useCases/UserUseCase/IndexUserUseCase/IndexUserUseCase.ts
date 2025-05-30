import { User } from "../../../domain/entities/User";
import { IUserRepository } from "../../../domain/repositories/UserRepository";

export class IndexUserUseCase{
    constructor(
        private userRepository: IUserRepository
    ){}

    async execute(): Promise<User[]>{

        return await this.userRepository.findAll()
    }
}