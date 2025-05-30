

import { AppointmentStatus } from "../../domain/enums/AppointmentStatus"
import { UpdateAppointmentUseCase } from "../../useCases/AppointmentUseCase/UpdateAppointmentUseCase/UpdateAppointmentUseCase"

describe("UpdateAppointmentUseCase", () => {
    it("Update appointment with no trouble", async () => {

        const mockAppointmentRepository = {
            findById: jest.fn().mockResolvedValue({
                id: "1",
                clientId: "1",
                barberId: "2",
                serviceId: "1",
                date: new Date("2025-05-30"),
                hour: "15:36",
                status: "pending"
            }),
            findByDateAndHour: jest.fn().mockResolvedValue(null),
            findAll: jest.fn().mockResolvedValue(null),
            update: jest.fn(),
            delete: jest.fn(),
            save: jest.fn()
        }

        const updateAppointmentUseCase = new UpdateAppointmentUseCase(mockAppointmentRepository)


        const appointmentData = {
            id: "1",
            hour: "15:37"
        }

        await updateAppointmentUseCase.execute(appointmentData)

        expect(mockAppointmentRepository.update).toHaveBeenCalledWith(expect.objectContaining({
            id: "1",
            clientId: "1",
            barberId: "2",
            serviceId: "1",
            date: expect.any(Date),
            hour: "15:37",
            status: "pending"
        }))

    })

    it("Update appointment no created", async () => {
        
        const mockAppointmentRepository = {
            findById: jest.fn().mockResolvedValue(null),
            findByDateAndHour: jest.fn().mockResolvedValue(null),
            findAll: jest.fn().mockResolvedValue(null),
            update: jest.fn(),
            delete: jest.fn(),
            save: jest.fn()
        }

        const updateAppointmentUseCase = new UpdateAppointmentUseCase(mockAppointmentRepository)


        const appointmentData = {
            id: "1",
            hour: "15:37"
        }

        await expect(updateAppointmentUseCase.execute(appointmentData)).rejects.toMatchObject({
            message: "Appointment don't exist",
            statusCode: 404
        })

    })
})