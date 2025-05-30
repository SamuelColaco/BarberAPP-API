import { IAppointmentRepository } from "../../../domain/repositories/AppointmentRepository";

export class IndexAppointmentUseCase{

    constructor(
        private appointmentRepository: IAppointmentRepository
    ){}

    async execute(){

        return await this.appointmentRepository.findAll()
        
    }
}