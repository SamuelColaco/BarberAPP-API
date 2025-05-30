import { IndexAppointmentUseCase } from "../../../../useCases/AppointmentUseCase/IndexAppointmentUseCase/IndexAppointmentUserCase";

import { Request, Response } from "express"

export class IndexAppointmentController{

    constructor(
        private indexAppointmentUseCase: IndexAppointmentUseCase
    ){}

    async index(req: Request, res: Response){

        const appointment = await this.indexAppointmentUseCase.execute()

        res.status(200).json({ message:appointment.length > 0 ? appointment : "No have appointments" })
    }
}