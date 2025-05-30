import { z } from "zod";
import { UpdateUserUseCase } from "../../../../useCases/UserUseCase/UpdateUserUseCase/UpdateUserUserCase";

import {  Request, Response } from "express"

export class UpdateUserController{
    constructor(
        private udpateUserUseCase: UpdateUserUseCase
    ){}

    async update(req: Request, res: Response){

        const paramSchema = z.object({
            id: z.string().uuid()

        })

        const { id } = paramSchema.parse(req.params)

        const bodySchema = z.object({
            name: z.string().optional(),
            email: z.string().email().optional(),
            password: z.string().min(6, {message: "Password need 6 caracteres"}).optional()
        })

        const { name, email, password } = bodySchema.parse(req.body)

        await this.udpateUserUseCase.execute({ id, name, email, password })

        res.status(200).json({ message: "Update success"})

    }
}