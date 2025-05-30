import { z } from "zod";
import { CreateAppointmentUseCase } from "../../../../useCases/AppointmentUseCase/CreateAppointmentUseCase/CreateAppointmentUseCase";
import { Request, Response } from "express"
import { AppointmentStatus } from "../../../../domain/enums/AppointmentStatus";


export class CreateAppointmentController{
    constructor(
        private createAppointmentUseCase: CreateAppointmentUseCase
    ){}

    async create(req: Request, res: Response){

        const paramSchema = z.object({
            barberId: z.string().uuid(),
            clientId: z.string().uuid(),
            serviceId: z.string().uuid()
        })

        const { barberId, clientId, serviceId } = paramSchema.parse(req.params)

        const bodySchema = z.object({

            dateTime: z.string().refine(val => !isNaN(Date.parse(val)), { message: "Invalid Date"}),
            hour: z.string().regex(/^\d{2}:\d{2}$/, "Hour invalid"),
            status: z.nativeEnum(AppointmentStatus).default(AppointmentStatus.PENDING)
            
        })

        const { dateTime, hour, status } = bodySchema.parse(req.body)

        await this.createAppointmentUseCase.execute({ barberId, clientId, serviceId, dateTime, hour, status})

        res.status(201).json({ message: "Appointment created with success"})
    }
}