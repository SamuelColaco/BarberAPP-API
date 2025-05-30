import { DeleteServiceUseCase } from "../../useCases/ServiceUseCase/DeleteServiceUseCase/DeleteServiceUseCase"


describe("DeleteServiceUseCase", () => {
    it("Delete service with no troubles", async () => {

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

        const deleteServiceUseCase = new DeleteServiceUseCase(mockServiceRepository)

        const serviceData = {
            id: "1"
        }

        await deleteServiceUseCase.execute(serviceData)

        expect(mockServiceRepository.delete).toHaveBeenCalledWith(expect.objectContaining({
            id: "1",
            barberId: "1",
            name: "barba",
            price: 10
        }))
    })

    it("Delete service with a service no created", async () => {

        const mockServiceRepository = {
            findById: jest.fn().mockResolvedValue(null),
            findAll: jest.fn().mockResolvedValue(null),
            update: jest.fn(),
            delete: jest.fn(),
            save: jest.fn()
        }


        const deleteServiceUseCase = new DeleteServiceUseCase(mockServiceRepository)

        const serviceData = {
            id: "1"
        }

        await expect(deleteServiceUseCase.execute(serviceData)).rejects.toMatchObject({
            message: "Service don't exist",
            statusCode: 404
        })
    })
})