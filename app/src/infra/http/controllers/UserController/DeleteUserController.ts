import { z } from "zod";
import { DeleteUserUseCase } from "../../../../useCases/UserUseCase/DeleteUserUseCase/DeleteUserUseCase";

import { Request, Response } from "express"

export class DeleteUserController{

    constructor(
        private deleteUserUseCase: DeleteUserUseCase
    ){}

    async deleteUser(req: Request, res: Response){

        const paramSchema = z.object({
            id: z.string().uuid()
        })

        const { id } = paramSchema.parse(req.params)

        await this.deleteUserUseCase.execute({ id })

        res.status(200).json({ message: "Delete has been success"})
    }
}