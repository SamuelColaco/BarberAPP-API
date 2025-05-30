import { prisma } from "../../../prisma";
import { Service } from "../../entities/Service";
import { IServiceRepository } from "../ServiceRepository";

export class IPrismaServiceRepository implements IServiceRepository{


    async findById(id: string): Promise<Service | null> {
        const serviceExist = await prisma.service.findFirst({ where: { id }})

        if(!serviceExist){
            return null
        }

        return new Service({
            barberId: serviceExist.barberId,
            name: serviceExist.name,
            price: serviceExist.price.toNumber()
        }, serviceExist.id)
    }

    async findAll(): Promise<Service[]> {
        
        const serviceExist = await prisma.service.findMany()

        return serviceExist.map(service => new Service({
            barberId: service.barberId,
            name: service.name,
            price: service.price.toNumber()
        }, service.id))
    }

    async delete({ id }: Service): Promise<void> {

        await prisma.service.delete({ where: { id }})

    }

    async update({ id, ...all}: Service): Promise<void> {
        
        await prisma.service.update({ where: { id }, data: { ...all}})
    }

    async save({ barberId, name, price }: Service): Promise<void> {
        
        await prisma.service.create({ data: {barberId: barberId, name: name, price: price }})
    }
}