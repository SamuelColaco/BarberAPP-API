import { AppointmentStatus } from "../../domain/enums/AppointmentStatus"
import { CreateAppointmentUseCase } from "../../useCases/AppointmentUseCase/CreateAppointmentUseCase/CreateAppointmentUseCase"

describe("CreateAppointmentUseCase", () => {
    it("Create appointment with no troubles", async () => {

        const mockServiceRepository = {
            findById: jest.fn().mockResolvedValue({
                id: "1",
                barberId: "2",
                name: "barba",
                price: 10
            }),
            findAll: jest.fn().mockResolvedValue(null),
            update: jest.fn(),
            delete: jest.fn(),
            save: jest.fn()
        }

         const mockUserRepository = {
            findByEmail: jest.fn().mockResolvedValue(null),
            findById: jest.fn().mockImplementation(async (id: string) => {
                if(id == "1"){
                    return Promise.resolve({
                        id: "1",
                        name: "Samuel",
                        email: "samuel@example.com",
                        passwordHash: "hashedPassword",
                        role: "client"
                    })
                }
                if(id == "2"){
                      return Promise.resolve({
                        id: "2",
                        name: "Diego",
                        email: "diego@example.com",
                        passwordHash: "hashedPassword",
                        role: "barber"
                    })
                }
            }),
            findAll: jest.fn().mockResolvedValue(null),
            update: jest.fn(),
            delete: jest.fn(),
            save: jest.fn()
        }

        const mockAppointmentRepository = {
            findById: jest.fn().mockResolvedValue(null),
            findByDateAndHour: jest.fn().mockResolvedValue(null),
            findAll: jest.fn().mockResolvedValue(null),
            update: jest.fn(),
            delete: jest.fn(),
            save: jest.fn()
        }

        const mockCreateNotification = {
            sendEmail: jest.fn().mockResolvedValue({
                to: "samuel@example.com",
                subject: "Agendamento feito",
                html: "<p>Agendamento para 29/05/2025 feito com sucesso</p>"
            })
        }

        const createAppointmentUseCase = new CreateAppointmentUseCase(mockAppointmentRepository, mockUserRepository ,mockServiceRepository , mockCreateNotification)

        const AppointmentData = {
            clientId: "1",
            barberId: "2",
            serviceId: "1",
            dateTime: "2025-05-30",
            hour: "15:38",
            status: AppointmentStatus.PENDING
        }

        await createAppointmentUseCase.execute(AppointmentData)

        expect(mockAppointmentRepository.save).toHaveBeenCalledWith(expect.objectContaining({
            clientId: "1",
            barberId: "2",
            serviceId: "1",
            date: expect.any(Date),
            hour: "15:38",
            status: "pending"
        }))

    })

    it("Create appointment with client no exist", async () => {
                const mockServiceRepository = {
            findById: jest.fn().mockResolvedValue({
                id: "1",
                barberId: "2",
                name: "barba",
                price: 10
            }),
            findAll: jest.fn().mockResolvedValue(null),
            update: jest.fn(),
            delete: jest.fn(),
            save: jest.fn()
        }

         const mockUserRepository = {
            findByEmail: jest.fn().mockResolvedValue(null),
            findById: jest.fn().mockResolvedValue(null),
            findAll: jest.fn().mockResolvedValue(null),
            update: jest.fn(),
            delete: jest.fn(),
            save: jest.fn()
        }

        const mockAppointmentRepository = {
            findById: jest.fn().mockResolvedValue(null),
            findByDateAndHour: jest.fn().mockResolvedValue(null),
            findAll: jest.fn().mockResolvedValue(null),
            update: jest.fn(),
            delete: jest.fn(),
            save: jest.fn()
        }

        const mockCreateNotification = {
            sendEmail: jest.fn().mockResolvedValue({
                to: "samuel@example.com",
                subject: "Agendamento feito",
                html: "<p>Agendamento para 29/05/2025 feito com sucesso</p>"
            })
        }

        const createAppointmentUseCase = new CreateAppointmentUseCase(mockAppointmentRepository, mockUserRepository ,mockServiceRepository , mockCreateNotification)

        const AppointmentData = {
            clientId: "1",
            barberId: "2",
            serviceId: "1",
            dateTime: "2025-05-30",
            hour: "15:38",
            status: AppointmentStatus.PENDING
        }

        await expect(createAppointmentUseCase.execute(AppointmentData)).rejects.toMatchObject({
            message: "User don't exist",
            statusCode: 404
        })
    })

    it("Create appointment with barber isn't a barber", async () => {
                const mockServiceRepository = {
            findById: jest.fn().mockResolvedValue({
                id: "1",
                barberId: "2",
                name: "barba",
                price: 10
            }),
            findAll: jest.fn().mockResolvedValue(null),
            update: jest.fn(),
            delete: jest.fn(),
            save: jest.fn()
        }

         const mockUserRepository = {
            findByEmail: jest.fn().mockResolvedValue(null),
            findById: jest.fn().mockImplementation( async (id: string) => {
                if(id == "1"){
                    return Promise.resolve({
                        id: "1",
                        name: "Samuel",
                        email: "samuel@example.com",
                        passwordHash: "hashedPassword",
                        role: "client"
                    })
                }
                if(id == "2"){
                      return Promise.resolve({
                        id: "2",
                        name: "Diego",
                        email: "diego@example.com",
                        passwordHash: "hashedPassword",
                        role: "client"
                    })
                }
            }),
            findAll: jest.fn().mockResolvedValue(null),
            update: jest.fn(),
            delete: jest.fn(),
            save: jest.fn()
        }

        const mockAppointmentRepository = {
            findById: jest.fn().mockResolvedValue(null),
            findByDateAndHour: jest.fn().mockResolvedValue(null),
            findAll: jest.fn().mockResolvedValue(null),
            update: jest.fn(),
            delete: jest.fn(),
            save: jest.fn()
        }

        const mockCreateNotification = {
            sendEmail: jest.fn().mockResolvedValue({
                to: "samuel@example.com",
                subject: "Agendamento feito",
                html: "<p>Agendamento para 29/05/2025 feito com sucesso</p>"
            })
        }

        const createAppointmentUseCase = new CreateAppointmentUseCase(mockAppointmentRepository, mockUserRepository ,mockServiceRepository , mockCreateNotification)

        const AppointmentData = {
            clientId: "1",
            barberId: "2",
            serviceId: "1",
            dateTime: "2025-05-30",
            hour: "15:38",
            status: AppointmentStatus.PENDING
        }

        await expect(createAppointmentUseCase.execute(AppointmentData)).rejects.toMatchObject({
            message: "Barber cannot be a client",
            statusCode: 401
        })
    })

    it("Create appointment with a service don't exist", async () => {

            const mockServiceRepository = {
            findById: jest.fn().mockResolvedValue(null),
            findAll: jest.fn().mockResolvedValue(null),
            update: jest.fn(),
            delete: jest.fn(),
            save: jest.fn()
        }

         const mockUserRepository = {
            findByEmail: jest.fn().mockResolvedValue(null),
            findById: jest.fn().mockImplementation( async (id: string) => {
                if(id == "1"){
                    return Promise.resolve({
                        id: "1",
                        name: "Samuel",
                        email: "samuel@example.com",
                        passwordHash: "hashedPassword",
                        role: "client"
                    })
                }
                if(id == "2"){
                      return Promise.resolve({
                        id: "2",
                        name: "Diego",
                        email: "diego@example.com",
                        passwordHash: "hashedPassword",
                        role: "barber"
                    })
                }
            }),
            findAll: jest.fn().mockResolvedValue(null),
            update: jest.fn(),
            delete: jest.fn(),
            save: jest.fn()
        }

        const mockAppointmentRepository = {
            findById: jest.fn().mockResolvedValue(null),
            findByDateAndHour: jest.fn().mockResolvedValue(null),
            findAll: jest.fn().mockResolvedValue(null),
            update: jest.fn(),
            delete: jest.fn(),
            save: jest.fn()
        }

        const mockCreateNotification = {
            sendEmail: jest.fn().mockResolvedValue({
                to: "samuel@example.com",
                subject: "Agendamento feito",
                html: "<p>Agendamento para 29/05/2025 feito com sucesso</p>"
            })
        }

        const createAppointmentUseCase = new CreateAppointmentUseCase(mockAppointmentRepository, mockUserRepository ,mockServiceRepository , mockCreateNotification)

        const AppointmentData = {
            clientId: "1",
            barberId: "2",
            serviceId: "1",
            dateTime: "2025-05-30",
            hour: "15:38",
            status: AppointmentStatus.PENDING
        }

        await expect(createAppointmentUseCase.execute(AppointmentData)).rejects.toMatchObject({
            message: "Service not found",
            statusCode: 404
        })

    })

    it("Create appointment with a service not from the barber choosen", async () => {
                const mockServiceRepository = {
            findById: jest.fn().mockResolvedValue({
                id: "1",
                barberId: "1",
                name: "barba",
                price: 10
            }),
            findAll: jest.fn().mockResolvedValue(null),
            update: jest.fn(),
            delete: jest.fn(),
            save: jest.fn()
        }

         const mockUserRepository = {
            findByEmail: jest.fn().mockResolvedValue(null),
            findById: jest.fn().mockImplementation( async (id: string) => {
                if(id == "1"){
                    return Promise.resolve({
                        id: "1",
                        name: "Samuel",
                        email: "samuel@example.com",
                        passwordHash: "hashedPassword",
                        role: "client"
                    })
                }
                if(id == "2"){
                      return Promise.resolve({
                        id: "2",
                        name: "Diego",
                        email: "diego@example.com",
                        passwordHash: "hashedPassword",
                        role: "barber"
                    })
                }
            }),
            findAll: jest.fn().mockResolvedValue(null),
            update: jest.fn(),
            delete: jest.fn(),
            save: jest.fn()
        }

        const mockAppointmentRepository = {
            findById: jest.fn().mockResolvedValue(null),
            findByDateAndHour: jest.fn().mockResolvedValue(null),
            findAll: jest.fn().mockResolvedValue(null),
            update: jest.fn(),
            delete: jest.fn(),
            save: jest.fn()
        }

        const mockCreateNotification = {
            sendEmail: jest.fn().mockResolvedValue({
                to: "samuel@example.com",
                subject: "Agendamento feito",
                html: "<p>Agendamento para 29/05/2025 feito com sucesso</p>"
            })
        }

        const createAppointmentUseCase = new CreateAppointmentUseCase(mockAppointmentRepository, mockUserRepository ,mockServiceRepository , mockCreateNotification)

        const AppointmentData = {
            clientId: "1",
            barberId: "2",
            serviceId: "1",
            dateTime: "2025-05-30",
            hour: "15:38",
            status: AppointmentStatus.PENDING
        }

        await expect(createAppointmentUseCase.execute(AppointmentData)).rejects.toMatchObject({
            message: "This service is not from the barber choosen",
            statusCode: 401
        })
    })

    it("Create appointment with a date/hour no avaible", async () => {
                const mockServiceRepository = {
            findById: jest.fn().mockResolvedValue({
                id: "1",
                barberId: "2",
                name: "barba",
                price: 10
            }),
            findAll: jest.fn().mockResolvedValue(null),
            update: jest.fn(),
            delete: jest.fn(),
            save: jest.fn()
        }

         const mockUserRepository = {
            findByEmail: jest.fn().mockResolvedValue(null),
            findById: jest.fn().mockImplementation( async (id: string) => {
                if(id == "1"){
                    return Promise.resolve({
                        id: "1",
                        name: "Samuel",
                        email: "samuel@example.com",
                        passwordHash: "hashedPassword",
                        role: "client"
                    })
                }
                if(id == "2"){
                      return Promise.resolve({
                        id: "2",
                        name: "Diego",
                        email: "diego@example.com",
                        passwordHash: "hashedPassword",
                        role: "barber"
                    })
                }
            }),
            findAll: jest.fn().mockResolvedValue(null),
            update: jest.fn(),
            delete: jest.fn(),
            save: jest.fn()
        }

        const mockAppointmentRepository = {
            findById: jest.fn().mockResolvedValue(null),
            findByDateAndHour: jest.fn().mockResolvedValue({
                id: "1",
                barberId: "2",
                clientId: "1",
                serviceId: "1",
                date: new Date("2025-05-30"),
                hour: "15:38",
                status: AppointmentStatus.PENDING
            }),
            findAll: jest.fn().mockResolvedValue(null),
            update: jest.fn(),
            delete: jest.fn(),
            save: jest.fn()
        }

        const mockCreateNotification = {
            sendEmail: jest.fn().mockResolvedValue({
                to: "samuel@example.com",
                subject: "Agendamento feito",
                html: "<p>Agendamento para 29/05/2025 feito com sucesso</p>"
            })
        }

        const createAppointmentUseCase = new CreateAppointmentUseCase(mockAppointmentRepository, mockUserRepository ,mockServiceRepository , mockCreateNotification)

        const AppointmentData = {
            clientId: "1",
            barberId: "2",
            serviceId: "1",
            dateTime: "2025-05-30",
            hour: "15:38",
            status: AppointmentStatus.PENDING
        }

        await  expect(createAppointmentUseCase.execute(AppointmentData)).rejects.toMatchObject({
            message: "Appointment with date/hour no avaiable",
            statusCode: 400
        })
    })

})