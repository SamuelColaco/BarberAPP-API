import { IServiceRepository } from "../../../domain/repositories/ServiceRepository";
import { AppError } from "../../../utils/AppError";
import { UpdateServiceDTO } from "./UpdateServiceDTO";

export class UpdateServiceUseCase{
    constructor(
        private serviceRepository: IServiceRepository
    ){}

    async execute({ id, barberId, name, price }: UpdateServiceDTO){

        const serviceExist = await this.serviceRepository.findById(id)

        if(!serviceExist){
            throw new AppError("Service don't exist", 404)
        }

        if(barberId){
            serviceExist.barberId = barberId
        }

        if(name){
            serviceExist.name = name
        }

        if(price){
            serviceExist.price = price
        }

        await this.serviceRepository.update(serviceExist)
    }
}