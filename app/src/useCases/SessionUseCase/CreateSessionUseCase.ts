import { ICompareHash } from "../../domain/interfaces/ICompareHash";
import { ITokenProvider } from "../../domain/interfaces/ITokenProvider";
import { IUserRepository } from "../../domain/repositories/UserRepository";
import { AppError } from "../../utils/AppError";
import { CreateSessionDTO } from "./CreateSessionDTO";


export class CreateSessionUseCase{
    
    
    constructor(
        private userRepository: IUserRepository,
        private comparePassword: ICompareHash,
        private createJwtToken: ITokenProvider
    ){}

    async execute({ email, password }: CreateSessionDTO){
        
        const userExist = await this.userRepository.findByEmail(email)

        if(!userExist){
            throw new AppError("User don't exist", 404)
        }

        const passwordTrue = await this.comparePassword.compare(password, userExist.passwordHash)

        if(!passwordTrue){
            throw new AppError("Email and/or password incorrects", 401)
        }

        const token = this.createJwtToken.generate(
            { role: userExist.role},
            { subject: userExist.id},
        )

        return {
            token,
            user: {
                id: userExist.id,
                name: userExist.name,
                email: userExist.email,
                role: userExist.role
            }
        }
    }
}