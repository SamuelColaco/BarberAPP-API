import { Appointment } from "../entities/Appointment";

export interface IAppointmentRepository{
    findById(id: string): Promise<Appointment | null>
    findByDateAndHour(barberId: string, date: Date, hour: string): Promise<Appointment | null>
    findAll(): Promise<Appointment[]>
    update(appointment: Appointment): Promise<void>
    delete(appointment: Appointment): Promise<void>
    save(appointment: Appointment): Promise<void>
}