import { date, z } from "zod";
import { UpdateAppointmentUseCase } from "../../../../useCases/AppointmentUseCase/UpdateAppointmentUseCase/UpdateAppointmentUseCase";

import { Request, Response } from "express"
import { AppointmentStatus } from "../../../../domain/enums/AppointmentStatus";

export class UpdateAppointmentController{
    constructor(
        private updateAppointmentUseCase: UpdateAppointmentUseCase
    ){}

    async update( req: Request, res: Response ){

        const paramSchema = z.object({
            id: z.string().uuid()
        })

        const { id } = paramSchema.parse(req.params)

        const bodySchema = z.object({
            dateTime: z.string().refine(val => !isNaN(Date.parse(val)), { message: "Invalid Date"}).optional(),
            hour: z.string().regex(/^\d{2}:\d{2}$/, "Hour invalid").optional(),
            status: z.nativeEnum(AppointmentStatus).default(AppointmentStatus.PENDING).optional()
        })

        const { dateTime, hour, status } = bodySchema.parse(req.body)

        await this.updateAppointmentUseCase.execute({ id, dateTime, hour, status })
    }
}