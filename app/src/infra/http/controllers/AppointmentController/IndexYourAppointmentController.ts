import { Request, Response } from "express"
import { z } from "zod";
import { IndexYourAppointmentUseCase } from "../../../../useCases/AppointmentUseCase/IndexYourAppointmentUseCase/IndexYourAppointmentUseCase";



export class IndexYourAppointmentController{
    constructor(
        private indexYourAppointmentUseCase: IndexYourAppointmentUseCase
    ){}

    async indexById(req: Request, res: Response){
        const paramSchema = z.object({
            clientId: z.string().uuid()
        })

        const { clientId } = paramSchema.parse(req.params)

        const appointmentByUser =  await this.indexYourAppointmentUseCase.execute({ clientId })

        res.status(200).json({ message: appointmentByUser.length > 0 ? appointmentByUser : "This user no have appointments" })
    }
}