
import { UserRole } from "../../domain/enums/UserRole"
import { UpdateUserUseCase } from "../../useCases/UserUseCase/UpdateUserUseCase/UpdateUserUserCase"



describe("UpdateUserUseCase", () => {
    it("Update user with no troubles", async () => {
        const mockUserRepository = {
            findByEmail: jest.fn().mockResolvedValue(null),
            findById: jest.fn().mockResolvedValue({
                id: "1",
                name: "Samuel",
                email: "samuel@example.com",
                passwordHash: "hashedPassword",
                role: "client"
            }),
            findAll: jest.fn().mockResolvedValue(null),
            update: jest.fn(),
            delete: jest.fn(),
            save: jest.fn()
        }

        const mockHashService = {
            hash: jest.fn().mockResolvedValue("1234567")
        }

        const updateUserUseCase = new UpdateUserUseCase(mockUserRepository, mockHashService)

        const userData = {
            id: "1",
            name: "Diego",
        }

        await updateUserUseCase.execute(userData)

        expect(mockUserRepository.update).toHaveBeenCalledWith(expect.objectContaining({
            id: "1",
            name: "Diego",
            email: "samuel@example.com",
            passwordHash: "hashedPassword",
            role: "client"
        }))
    })

    it("Update user no created", async () => {
           const mockUserRepository = {
            findByEmail: jest.fn().mockResolvedValue(null),
            findById: jest.fn().mockResolvedValue(null),
            findAll: jest.fn().mockResolvedValue(null),
            update: jest.fn(),
            delete: jest.fn(),
            save: jest.fn()
        }

        const mockHashService = {
            hash: jest.fn().mockResolvedValue("1234567")
        }

        const updateUserUseCase =  new UpdateUserUseCase(mockUserRepository, mockHashService)

        const userData = {
            id:"1",
            password: "1234567"
        }

        await expect(updateUserUseCase.execute(userData)).rejects.toMatchObject({
            message: "User no exist",
            statusCode: 404
        })
    })
})