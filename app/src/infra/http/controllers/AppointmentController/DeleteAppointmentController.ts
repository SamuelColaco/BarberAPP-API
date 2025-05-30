import { z } from "zod";
import { DeleteAppointmentUseCase } from "../../../../useCases/AppointmentUseCase/DeleteAppointmentUseCase/DeleteAppointmentUseCase";

import { Request, Response } from "express"

export class DeleteAppointmentController{
    constructor(
        private deleteAppointmentUseCase: DeleteAppointmentUseCase
    ){}

    async deleteAppointment(req: Request, res: Response){

        const paramSchema = z.object({
            id: z.string().uuid()
        })

        const { id } = paramSchema.parse(req.params)

        await this.deleteAppointmentUseCase.execute({ id })

        res.status(200).json({ message: "Delete has been success"})
    }
}