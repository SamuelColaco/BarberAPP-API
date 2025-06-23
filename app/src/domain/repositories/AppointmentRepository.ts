import { AppointmentResponseDTO } from "../../dto/AppointmentResponse.dto";
import { Appointment } from "../entities/Appointment";

export interface IAppointmentRepository{
    findById(id: string): Promise<Appointment | null>
    findByDateAndHour(barberId: string, date: Date, hour: string): Promise<Appointment | null>
    update(appointment: Appointment): Promise<void>
    delete(appointment: Appointment): Promise<void>
    save(appointment: Appointment): Promise<void>
}

export interface IAppointmentQueryRepository{
    findAll(): Promise<AppointmentResponseDTO[]>
}