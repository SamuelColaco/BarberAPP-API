import { IServiceRepository } from "../../../domain/repositories/ServiceRepository";
import { AppError } from "../../../utils/AppError";
import { DeleteServiceDTO } from "./DeleteServiceDTO";

export class DeleteServiceUseCase{
    constructor(
        private serviceRepository: IServiceRepository
    ){}

    async execute({ id }: DeleteServiceDTO){

        const serviceExist = await this.serviceRepository.findById(id)

        if(!serviceExist){
            throw new AppError("Service don't exist", 404)
        }

        await this.serviceRepository.delete(serviceExist)
    }
}