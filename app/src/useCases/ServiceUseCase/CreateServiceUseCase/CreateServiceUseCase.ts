import { Service } from "../../../domain/entities/Service";
import { IServiceRepository } from "../../../domain/repositories/ServiceRepository";
import { IUserRepository } from "../../../domain/repositories/UserRepository";
import { AppError } from "../../../utils/AppError";
import { CreateServiceDTO } from "./CreateServiceDTO";

export class CreateServiceUseCase{

    constructor(
        private serviceRepository: IServiceRepository,
        private userRepository: IUserRepository
    ){}

    async execute({ barberId, name, price }: CreateServiceDTO){

        const barberExist =  await this.userRepository.findById(barberId)

        if(!barberExist){
            throw new AppError("User no exist", 404)
        }

        const service = new Service({ barberId, name, price })

        await this.serviceRepository.save(service)

    }
}