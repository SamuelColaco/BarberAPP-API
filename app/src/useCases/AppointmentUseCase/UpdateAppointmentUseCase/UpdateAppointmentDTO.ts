import { AppointmentStatus } from "../../../domain/enums/AppointmentStatus"



export interface UpdateAppointmentDTO{
    id: string

    dateTime?: string
    hour?: string
    status?: AppointmentStatus
}