import { UserRole } from "../../domain/enums/UserRole"
import { CreateUserUseCase } from "../../useCases/UserUseCase/CreateUserUseCase/CreateUserUseCase"


describe("CreateUseruseCase", () => {
    it("Create user with no troubles", async () => {
        const mockUserRepository = {
            findByEmail: jest.fn().mockResolvedValue(null),
            findById: jest.fn().mockResolvedValue(null),
            findAll: jest.fn().mockResolvedValue(null),
            update: jest.fn(),
            delete: jest.fn(),
            save: jest.fn()
        }

        const mockHashService = {
            hash: jest.fn().mockResolvedValue("hashedPassword")
        }

        const createUserUseCase = new CreateUserUseCase(mockUserRepository, mockHashService)

        const userData = {
            name: "Samuel",
            email: "samuel@example.com",
            password: "1234567",
            role: UserRole.CLIENT
        }

        await createUserUseCase.execute(userData)

        expect(mockUserRepository.save).toHaveBeenCalledWith(expect.objectContaining({
            name: "Samuel",
            email: "samuel@example.com",
            passwordHash: "hashedPassword",
            role: "client"
        }))
    })

    it("Create user with a same Email", async () => {

          const mockUserRepository = {
            findByEmail: jest.fn().mockResolvedValue({
                name: "Samuel",
                email: "samuel@example.com",
                passwordHash: "hashedPassword",
                role: "client"
            }),
            findById: jest.fn().mockResolvedValue(null),
            findAll: jest.fn().mockResolvedValue(null),
            update: jest.fn(),
            delete: jest.fn(),
            save: jest.fn()
        }

        const mockHashService = {
            hash: jest.fn().mockResolvedValue("hashedPassword")
        }

        const createUserUseCase = new CreateUserUseCase(mockUserRepository, mockHashService)

        const userData = {
            name: "Diego",
            email: "samuel@example.com",
            password: "1234567",
            role: UserRole.CLIENT
        }

        await expect(createUserUseCase.execute(userData)).rejects.toMatchObject({
            message: "User exist",
            statusCode: 400
        })
    })
})