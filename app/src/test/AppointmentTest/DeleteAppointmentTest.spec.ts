import { DeleteAppointmentUseCase } from "../../useCases/AppointmentUseCase/DeleteAppointmentUseCase/DeleteAppointmentUseCase"

describe("DeleteAppointmentUseCase", () => {
    it("Delete appointment with no trouble", async () => {
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

        const deleteAppointmentUseCase = new DeleteAppointmentUseCase(mockAppointmentRepository)

        const appointmentData = {
            id: "1"
        }

        await deleteAppointmentUseCase.execute(appointmentData)

        expect(mockAppointmentRepository.delete).toHaveBeenCalledWith(expect.objectContaining({
               id: "1",
                clientId: "1",
                barberId: "2",
                serviceId: "1",
                date: new Date("2025-05-30"),
                hour: "15:36",
                status: "pending"
        }))
    })

    it("Delete appointment no created", async () => {

       const mockAppointmentRepository = {
            findById: jest.fn().mockResolvedValue(null),
            findByDateAndHour: jest.fn().mockResolvedValue(null),
            findAll: jest.fn().mockResolvedValue(null),
            update: jest.fn(),
            delete: jest.fn(),
            save: jest.fn()
        }

        const deleteAppointmentUseCase = new DeleteAppointmentUseCase(mockAppointmentRepository)

        const appointmentData = {
            id: "1"
        }

        await expect(deleteAppointmentUseCase.execute(appointmentData)).rejects.toMatchObject({
            message: "Appointment don't exist",
            statusCode: 404
        })
    })

})