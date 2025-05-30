

import { UserRole } from "../../domain/enums/UserRole"
import { DeleteUserUseCase } from "../../useCases/UserUseCase/DeleteUserUseCase/DeleteUserUseCase"




describe("DeleteUserUseCase", () => {
    it("Delete user with no troubles", async () => {
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

        const deleteUserUseCase = new DeleteUserUseCase(mockUserRepository)

        const userData = {
            id: "1"
        }

        await deleteUserUseCase.execute(userData)

        expect(mockUserRepository.delete).toHaveBeenCalledWith(expect.objectContaining({
            id: "1",
            name: "Samuel",
            email: "samuel@example.com",
            passwordHash: "hashedPassword",
            role: "client"
        }))
    })

    it("Delete user no created", async () => {
           const mockUserRepository = {
            findByEmail: jest.fn().mockResolvedValue(null),
            findById: jest.fn().mockResolvedValue(null),
            findAll: jest.fn().mockResolvedValue(null),
            update: jest.fn(),
            delete: jest.fn(),
            save: jest.fn()
        }

        const deleteUserUseCase =  new DeleteUserUseCase(mockUserRepository)

        const userData = {
            id:"1"
        }

        await expect(deleteUserUseCase.execute(userData)).rejects.toMatchObject({
            message: "User no exist",
            statusCode: 404
        })
    })
})