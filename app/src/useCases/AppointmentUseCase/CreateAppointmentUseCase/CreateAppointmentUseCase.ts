import { Appointment } from "../../../domain/entities/Appointment";
import { IMailProvider } from "../../../domain/interfaces/IMailProvider";
import { IAppointmentRepository } from "../../../domain/repositories/AppointmentRepository";
import { IServiceRepository } from "../../../domain/repositories/ServiceRepository";
import { IUserRepository } from "../../../domain/repositories/UserRepository";
import { AppError } from "../../../utils/AppError";
import { CreateAppointmentDTO } from "./CreateAppointmentDTO";

export class CreateAppointmentUseCase{
    constructor(
        private appointmentRepository: IAppointmentRepository,
        private userRepository: IUserRepository,
        private serviceRepository: IServiceRepository,
        private createNotificationByEmail: IMailProvider
    ){}

    async execute({ clientId, barberId, serviceId, dateTime, hour, status
     }: CreateAppointmentDTO){

        const userExist = await this.userRepository.findById(clientId)

        const date = new Date(dateTime)
        date.setHours(0,0,0,0)

        if(!userExist){
            throw new AppError("User don't exist", 404)
        }

        const barberExist = await this.userRepository.findById(barberId)

        if(!barberExist){
            throw new AppError("Barber don't exist", 404)
        }

        if(barberExist.role != "barber"){
            throw new AppError("Barber cannot be a client", 401)
        }

        const serviceExist =  await this.serviceRepository.findById(serviceId)

        if(!serviceExist){
            throw new AppError("Service not found", 404)
        }

        if(serviceExist.barberId != barberExist.id){
            throw new AppError("This service is not from the barber choosen", 401)
        }

        const conflictDateAndHour = await this.appointmentRepository.findByDateAndHour(barberId, date, hour)

        if(conflictDateAndHour){
            throw new AppError("Appointment with date/hour no avaiable")
        }


        const appointment = new Appointment({ clientId, barberId, serviceId, date, hour, status})

        await this.appointmentRepository.save(appointment)

        await this.createNotificationByEmail.sendEmail(
            userExist.email,
            "Agendamento feito",
            `<p>Agendamento para ${ date.toLocaleDateString("pt-BR") } feito com sucesso</p>`
        )
    }
}