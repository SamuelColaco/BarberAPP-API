import { z } from "zod";
import { DeleteServiceUseCase } from "../../../../useCases/ServiceUseCase/DeleteServiceUseCase/DeleteServiceUseCase";

import { Request, Response } from "express"

export class DeleteServiceController{
    constructor(
        private deleteServiceUseCase: DeleteServiceUseCase
    ){}

    async deleteService(req: Request, res: Response){

        const paramSchema = z.object({
            id: z.string().uuid()
        })

        const { id } = paramSchema.parse(req.params)

        await this.deleteServiceUseCase.execute({ id })

        res.status(200).json({ message: "Delete service with success"})
    }
}