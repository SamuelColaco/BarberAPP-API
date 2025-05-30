import { IUserRepository } from "../../../domain/repositories/UserRepository";
import { AppError } from "../../../utils/AppError";
import { DeleteUserDTO } from "./DeleteUserDTO";

export class DeleteUserUseCase{

    constructor(
        private userRepository: IUserRepository
    ){}

    async execute({ id }: DeleteUserDTO){
       
        const userExist = await this.userRepository.findById(id)

        if(!userExist){
            throw new AppError("User no exist", 404)
        }

        await this.userRepository.delete(userExist)
    }
}