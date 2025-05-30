import { IPrismaServiceRepository } from "../../../../domain/repositories/PrismaRepositories/PrismaServiceRepository";
import { IPrismaUserRepository } from "../../../../domain/repositories/PrismaRepositories/PrismaUserRepository";
import { CreateServiceUseCase } from "../../../../useCases/ServiceUseCase/CreateServiceUseCase/CreateServiceUseCase";
import { DeleteServiceUseCase } from "../../../../useCases/ServiceUseCase/DeleteServiceUseCase/DeleteServiceUseCase";
import { IndexServiceUseCase } from "../../../../useCases/ServiceUseCase/IndexServiceUseCase/IndexServiceUseCase";
import { UpdateServiceUseCase } from "../../../../useCases/ServiceUseCase/UpdateServiceUseCase/UpdateServiceUseCase";
import { CreateServiceController } from "../../controllers/ServiceController/CreateServiceController";
import { DeleteServiceController } from "../../controllers/ServiceController/DeleteServiceController";
import { IndexServiceController } from "../../controllers/ServiceController/IndexServiceController";
import { UpdateServiceController } from "../../controllers/ServiceController/UpdateServiceController";


const serviceRepository = new IPrismaServiceRepository()
const userRepository = new IPrismaUserRepository()

const createServiceUseCase = new CreateServiceUseCase(serviceRepository, userRepository)
const updateServiceUseCase = new UpdateServiceUseCase(serviceRepository)
const indexServiceUseCase = new IndexServiceUseCase(serviceRepository)
const deleteServiceUseCase = new DeleteServiceUseCase(serviceRepository)

export const createServiceController = new CreateServiceController(createServiceUseCase)
export const updateServiceController = new UpdateServiceController(updateServiceUseCase)
export const indexServiceController = new IndexServiceController(indexServiceUseCase)
export const deleteServiceController = new DeleteServiceController(deleteServiceUseCase)
