import { z } from "zod";
import { UpdateServiceUseCase } from "../../../../useCases/ServiceUseCase/UpdateServiceUseCase/UpdateServiceUseCase";

import { Request, Response } from "express"

export class UpdateServiceController{

    constructor(
        private updateServiceUseCase: UpdateServiceUseCase
    ){}

    async update(req: Request, res: Response){

        const paramSchema = z.object({
            id: z.string().uuid()
        })

        const { id } = paramSchema.parse(req.params)

        const bodySchema = z.object({
            barberId: z.string().uuid().optional(),
            name: z.string().optional(),
            price: z.number().positive({ message: "Price need be a positive number"}).optional()
        })

        const {  barberId , name, price } = bodySchema.parse(req.body)

        await this.updateServiceUseCase.execute({ id, barberId, name, price })

        res.status(200).json({ message: "Update service with success"})

    }
}