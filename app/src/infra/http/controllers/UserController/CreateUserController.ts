import { z } from "zod";
import { IUserRepository } from "../../../../domain/repositories/UserRepository";
import { Request, Response } from "express"
import { IPrismaUserRepository } from "../../../../domain/repositories/PrismaRepositories/PrismaUserRepository";
import { IHashProvider } from "../../../../domain/interfaces/IHashProvider";
import { CreateUserUseCase } from "../../../../useCases/UserUseCase/CreateUserUseCase/CreateUserUseCase";
import { UserRole } from "../../../../domain/enums/UserRole";

export class CreateUserController{
    constructor(
        private createUserUseCase: CreateUserUseCase
    ){}

    async create(req: Request, res: Response){

        const bodySchema = z.object({
            name: z.string(),
            email: z.string().email(),
            password: z.string().min(6, { message: "Password need 6 caracteres"}),
            role: z.nativeEnum(UserRole).default(UserRole.CLIENT)
        })

        const { name, email, password, role } = bodySchema.parse(req.body)

        await this.createUserUseCase.execute({ name, email, password, role})

        res.status(201).json({ message: "User create with success"})

    }
}