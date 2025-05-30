import { z } from "zod";
import { CreateServiceUseCase } from "../../../../useCases/ServiceUseCase/CreateServiceUseCase/CreateServiceUseCase";
import { Request, Response } from "express"

export class CreateServiceController{
    constructor(
        private createServiceUseCase: CreateServiceUseCase
    ){}

    async create(req: Request, res: Response){

        const paramSchema = z.object({
            barberId: z.string().uuid()
        })
        const { barberId } = paramSchema.parse(req.params)

        const bodySchema = z.object({
            name: z.string(),
            price: z.number().positive({ message: "Price need be a positive number"})
        })

        const { name, price } = bodySchema.parse(req.body)

        await this.createServiceUseCase.execute({ barberId, name, price })

        res.status(201).json({ message: "Service created with success"})
    }
}