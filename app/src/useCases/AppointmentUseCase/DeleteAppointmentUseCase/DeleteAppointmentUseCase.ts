import { IAppointmentRepository } from "../../../domain/repositories/AppointmentRepository";
import { AppError } from "../../../utils/AppError";
import { DeleteAppointmentDTO } from "./DeleteAppointmentDTO";


export class DeleteAppointmentUseCase{
    constructor(
        private appointmentRepository: IAppointmentRepository
    ){}

    async execute({ id }: DeleteAppointmentDTO){

        const appointmentExist = await this.appointmentRepository.findById(id)

        if(!appointmentExist){
            throw new AppError("Appointment don't exist", 404)
        }

        await this.appointmentRepository.delete(appointmentExist)
    }
}