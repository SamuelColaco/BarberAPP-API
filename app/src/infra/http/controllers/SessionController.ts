import { z } from "zod";
import { CreateSessionUseCase } from "../../../useCases/SessionUseCase/CreateSessionUseCase";

import { Request, Response } from "express"

export class SessionController{
    

    constructor(
        private createSessionUseCase: CreateSessionUseCase
    ){}

    async create( req: Request, res: Response ){

        const bodySchema = z.object({
            email: z.string().email(),
            password: z.string().min(6, { message: "Password need 6 caracteres"})
        })

        const { email, password } = bodySchema.parse(req.body)

        const token = await this.createSessionUseCase.execute({ email, password})

        res.status(201).json({ token: token })
    }
}