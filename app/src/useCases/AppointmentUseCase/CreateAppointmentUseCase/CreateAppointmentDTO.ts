import { AppointmentStatus } from "../../../domain/enums/AppointmentStatus"



export interface CreateAppointmentDTO{
    clientId: string
    barberId: string
    serviceId: string

    dateTime: string
    hour: string
    status: AppointmentStatus

}


