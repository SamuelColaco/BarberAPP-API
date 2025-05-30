import { IPrismaUserRepository } from "../../../../domain/repositories/PrismaRepositories/PrismaUserRepository";
import { CreateUserUseCase } from "../../../../useCases/UserUseCase/CreateUserUseCase/CreateUserUseCase";
import { DeleteUserUseCase } from "../../../../useCases/UserUseCase/DeleteUserUseCase/DeleteUserUseCase";
import { IndexUserUseCase } from "../../../../useCases/UserUseCase/IndexUserUseCase/IndexUserUseCase";
import { UpdateUserUseCase } from "../../../../useCases/UserUseCase/UpdateUserUseCase/UpdateUserUserCase";
import { CreateBcryptHash } from "../../../providers/hash/CreateBcryptHash";
import { CreateUserController } from "../../controllers/UserController/CreateUserController";
import { DeleteUserController } from "../../controllers/UserController/DeleteUserController";
import { IndexUserController } from "../../controllers/UserController/IndexUserController";
import { UpdateUserController } from "../../controllers/UserController/UpdateUserController";

const prismaUserRepository = new IPrismaUserRepository()
const createBcryptHash = new CreateBcryptHash()

const createUserUseCase = new CreateUserUseCase(prismaUserRepository, createBcryptHash)
const updateUserUseCase = new UpdateUserUseCase(prismaUserRepository, createBcryptHash)
const indexUserUseCase = new IndexUserUseCase(prismaUserRepository)
const deleteUserUseCase = new DeleteUserUseCase(prismaUserRepository)

export const createUserController = new CreateUserController(createUserUseCase)
export const updateUserController = new UpdateUserController(updateUserUseCase)
export const indexUserController = new IndexUserController(indexUserUseCase)
export const deleteUserController = new DeleteUserController(deleteUserUseCase)