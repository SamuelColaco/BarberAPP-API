import { AppointmentMapper } from "../../../infra/mappers/AppointmentMapper";
import { prisma } from "../../../prisma";
import { Appointment } from "../../entities/Appointment";
import { IAppointmentRepository } from "../AppointmentRepository";

export class IPrismaAppointmentRepository implements IAppointmentRepository{
   async findById(id: string): Promise<Appointment | null> {
        const appointmentExist = await prisma.appointment.findFirst({ where: { id }})

        if(!appointmentExist){
            return null
        }

        return AppointmentMapper.toDomain(appointmentExist)
    }

    async findByDateAndHour(barberId: string, date: Date, hour: string): Promise<Appointment | null> {
        const appointmentExist = await prisma.appointment.findFirst({ where: { barberId, date, hour }})

        if(!appointmentExist){
            return null
        }

        return AppointmentMapper.toDomain(appointmentExist)
    }

    async findAll(): Promise<Appointment[]> {
        
        const appointmentExist = await prisma.appointment.findMany()

        return AppointmentMapper.toDomainManyAppointment(appointmentExist)
    }

    async delete({ id }: Appointment): Promise<void> {
        await prisma.appointment.delete({ where: { id }})
    }

    async update({ id, ...all }: Appointment): Promise<void> {
        await prisma.appointment.update({ where: { id }, data: { ...all }})
    }

    async save({ barberId, clientId, serviceId, date, hour, status}: Appointment): Promise<void> {
        await prisma.appointment.create({ data: { barberId, clientId, serviceId, date, hour, status }})
    }
}