import { Service } from "../entities/Service";

export interface IServiceRepository{
    findById(id: string): Promise<Service | null>
    findAll(): Promise<Service[]>
    update(service: Service): Promise<void>
    delete(service: Service): Promise<void>
    save(service: Service): Promise<void>
}