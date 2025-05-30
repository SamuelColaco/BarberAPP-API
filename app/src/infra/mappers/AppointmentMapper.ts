
import { Appointment as DomainAppointment } from "../../domain/entities/Appointment"
import { AppointmentStatus as DomainAppointmentStatus } from "../../domain/enums/AppointmentStatus"
import { Appointment as PrismaAppointment, AppointmentStatus as PrismaAppointmentStatus } from "@prisma/client"



export class AppointmentMapper{
    static toDomain(prismaAppointment: PrismaAppointment){
        return new DomainAppointment({
            barberId: prismaAppointment.barberId,
            clientId: prismaAppointment.clientId,
            serviceId: prismaAppointment.serviceId,
            date: prismaAppointment.date,
            hour: prismaAppointment.hour,
            status: prismaAppointment.status as DomainAppointmentStatus
        }, prismaAppointment.id)
    } 

    static toPrisma(domainAppointment: DomainAppointment){
        return domainAppointment.status as PrismaAppointmentStatus
    }

    static toDomainManyAppointment(prismaAppointment: PrismaAppointment[]){

        return prismaAppointment.map(appointment => new DomainAppointment({
            barberId: appointment.barberId,
            clientId: appointment.clientId,
            serviceId: appointment.serviceId,
            date: appointment.date,
            hour: appointment.hour,
            status: appointment.status as DomainAppointmentStatus
        }, appointment.id))
    }
}