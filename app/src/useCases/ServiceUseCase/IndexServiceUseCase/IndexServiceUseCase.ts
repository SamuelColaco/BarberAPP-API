import { Service } from "../../../domain/entities/Service";
import { IServiceRepository } from "../../../domain/repositories/ServiceRepository";

export class IndexServiceUseCase{
    constructor(
        private serviceRepository: IServiceRepository
    ){}

    async execute(): Promise<Service[]>{

        

        return await this.serviceRepository.findAll()


    }
}