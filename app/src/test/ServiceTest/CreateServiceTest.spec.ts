import { CreateServiceUseCase } from "../../useCases/ServiceUseCase/CreateServiceUseCase/CreateServiceUseCase"

describe("CreateServiceUseCase", () => {
    it("Create service with no troubles", async () => {

        const mockServiceRepository = {
            findById: jest.fn().mockResolvedValue(null),
            findAll: jest.fn().mockResolvedValue(null),
            update: jest.fn(),
            delete: jest.fn(),
            save: jest.fn()
        }

        const mockUserRepository = {
            findByEmail: jest.fn().mockResolvedValue(null),
            findById: jest.fn().mockResolvedValue(({
                id:"1",
                name: "Samuel",
                email: "samuel@example.com",
                passwordHash: "hashedPassword",
                role: "barber"
            })),
            findAll: jest.fn().mockResolvedValue(null),
            update: jest.fn(),
            delete: jest.fn(),
            save: jest.fn()
        }

        const createServiceUseCase = new CreateServiceUseCase(mockServiceRepository, mockUserRepository)

        const serviceData = {
            barberId: "1",
            name: "barba",
            price: 10
        }

        await createServiceUseCase.execute(serviceData)


        expect(mockServiceRepository.save).toHaveBeenCalledWith(expect.objectContaining({
            barberId: "1",
            name: "barba",
            price: 10
        }))
    })

    it("Create service with a user no created", async () => {

          const mockUserRepository = {
            findByEmail: jest.fn().mockResolvedValue(null),
            findById: jest.fn().mockResolvedValue(null),
            findAll: jest.fn().mockResolvedValue(null),
            update: jest.fn(),
            delete: jest.fn(),
            save: jest.fn()
        }

        const mockServiceRepository = {
            findById: jest.fn().mockResolvedValue(null),
            findAll: jest.fn().mockResolvedValue(null),
            update: jest.fn(),
            delete: jest.fn(),
            save: jest.fn()
        }


        const createServiceUseCase = new CreateServiceUseCase(mockServiceRepository, mockUserRepository)

        const userData = {
            barberId: "1",
            name: "barba",
            price: 10
        }

        await expect(createServiceUseCase.execute(userData)).rejects.toMatchObject({
            message: "User no exist",
            statusCode: 404
        })
    })
})