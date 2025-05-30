



import { UpdateServiceUseCase } from "../../useCases/ServiceUseCase/UpdateServiceUseCase/UpdateServiceUseCase"

describe("UpdateServiceUseCase", () => {
    it("Update service with no troubles", async () => {

        const mockServiceRepository = {
            findById: jest.fn().mockResolvedValue(({
                id: "1",
                barberId: "1",
                name:"barba",
                price: 10
            })),
            findAll: jest.fn().mockResolvedValue(null),
            update: jest.fn(),
            delete: jest.fn(),
            save: jest.fn()
        }

        const updateServiceUseCase = new UpdateServiceUseCase(mockServiceRepository)

        const serviceData = {
            id: "1",
            name: "corte"
        }

        await updateServiceUseCase.execute(serviceData)

        expect(mockServiceRepository.update).toHaveBeenCalledWith(expect.objectContaining({
            barberId: "1",
            name: "corte",
            price: 10
        }))
    })

    it("Update service with a service no created", async () => {

        const mockServiceRepository = {
            findById: jest.fn().mockResolvedValue(null),
            findAll: jest.fn().mockResolvedValue(null),
            update: jest.fn(),
            delete: jest.fn(),
            save: jest.fn()
        }


        const updateServiceUseCase = new UpdateServiceUseCase(mockServiceRepository)

        const serviceData = {
            id: "1",
            name: "barba cortada"
        }

        await expect(updateServiceUseCase.execute(serviceData)).rejects.toMatchObject({
            message: "Service don't exist",
            statusCode: 404
        })
    })
})