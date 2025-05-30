import { IAppointmentRepository } from "../../../domain/repositories/AppointmentRepository";
import { AppError } from "../../../utils/AppError";
import { UpdateAppointmentDTO } from "./UpdateAppointmentDTO";

export class UpdateAppointmentUseCase{

    constructor(
        private appointmentRepository: IAppointmentRepository
    ){}

    async execute({ id, dateTime, hour, status }: UpdateAppointmentDTO){

        const appointmentExist = await this.appointmentRepository.findById(id)

        if(!appointmentExist){
            throw new AppError("Appointment don't exist", 404)
        }

        if(dateTime){
            const date = new Date(dateTime)
            date.setUTCHours(0,0,0,0)
            appointmentExist.date = date
        }

        if(hour){
            appointmentExist.hour = hour
        }

        if(status){
            appointmentExist.status = status
        }

        await this.appointmentRepository.update(appointmentExist)
    }
}