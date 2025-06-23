import { IAppointmentQueryRepository } from "../../../domain/repositories/AppointmentRepository";

export class IndexAppointmentUseCase{

    constructor(
        private appointmentRepository: IAppointmentQueryRepository
    ){}

    async execute(){

        return await this.appointmentRepository.findAll()
        
    }
}