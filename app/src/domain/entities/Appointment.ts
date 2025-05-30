
import { randomUUID } from "node:crypto"
import { AppointmentStatus } from "../enums/AppointmentStatus"

type AppointmentProps = {
    clientId: string
    barberId: string
    serviceId: string

    date: Date
    hour: string
    status: AppointmentStatus
}

export class Appointment{

    public readonly id: string  
    
    public clientId: string
    public barberId: string
    public serviceId: string

    public date: Date
    public hour: string
    public status: AppointmentStatus


    constructor({ clientId, barberId, serviceId, date, hour, status}: AppointmentProps, id?: string){

        this.id = id ?? randomUUID()
        this.clientId = clientId
        this.barberId = barberId
        this.serviceId = serviceId
        this.date = date
        this.hour = hour ?? new Date()
        this.status = status ?? AppointmentStatus.PENDING
    }
}