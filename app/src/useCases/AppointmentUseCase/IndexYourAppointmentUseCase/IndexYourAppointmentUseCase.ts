import { IAppointmentQueryRepository } from "../../../domain/repositories/AppointmentRepository";
import { IUserRepository } from "../../../domain/repositories/UserRepository";
import { AppError } from "../../../utils/AppError";
import { IndexYourAppointmentDTO } from "./IndexYourAppointmentDTO";

export class IndexYourAppointmentUseCase{
    constructor(
        private appointmentRepository: IAppointmentQueryRepository,
        private userRepository: IUserRepository
    ){}

    async execute({ clientId }: IndexYourAppointmentDTO){

        const userExist = await this.userRepository.findById(clientId)

        if(!userExist){
            throw new AppError("User don't exist", 404)
        }

        return await this.appointmentRepository.findByUserId(clientId)

    }
}