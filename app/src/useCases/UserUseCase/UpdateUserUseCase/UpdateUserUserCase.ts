import { IHashProvider } from "../../../domain/interfaces/IHashProvider";
import { IUserRepository } from "../../../domain/repositories/UserRepository";
import { AppError } from "../../../utils/AppError";
import { UpdateUserDTO } from "./UpdateUserDTO";

export class UpdateUserUseCase{
    
    constructor(
        private userRepository: IUserRepository,
        private createBryptHash: IHashProvider
    ){}

    async execute({id, name,  email, password }: UpdateUserDTO){

        const userExist = await this.userRepository.findById(id)

        if(!userExist){
            throw new AppError("User no exist", 404)
        }


        if(name){
            userExist.name = name
        }

        if(email){
            userExist.email = email
        }

        if(password){
            userExist.passwordHash = await this.createBryptHash.hash(password)
        }

        await this.userRepository.update(userExist)

    }
}