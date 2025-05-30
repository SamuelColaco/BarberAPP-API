import { IPrismaAppointmentRepository } from "../../../../domain/repositories/PrismaRepositories/PrismaAppointmentRepository";
import { IPrismaServiceRepository } from "../../../../domain/repositories/PrismaRepositories/PrismaServiceRepository";
import { IPrismaUserRepository } from "../../../../domain/repositories/PrismaRepositories/PrismaUserRepository";
import { CreateAppointmentUseCase } from "../../../../useCases/AppointmentUseCase/CreateAppointmentUseCase/CreateAppointmentUseCase";
import { DeleteAppointmentUseCase } from "../../../../useCases/AppointmentUseCase/DeleteAppointmentUseCase/DeleteAppointmentUseCase";
import { IndexAppointmentUseCase } from "../../../../useCases/AppointmentUseCase/IndexAppointmentUseCase/IndexAppointmentUserCase";
import { UpdateAppointmentUseCase } from "../../../../useCases/AppointmentUseCase/UpdateAppointmentUseCase/UpdateAppointmentUseCase";
import { CreateNotificationByEmail } from "../../../providers/mail/CreateNotificationByEmail";
import { CreateAppointmentController } from "../../controllers/AppointmentController/CreateAppointmentController";
import { DeleteAppointmentController } from "../../controllers/AppointmentController/DeleteAppointmentController";
import { IndexAppointmentController } from "../../controllers/AppointmentController/IndexAppointmentController";
import { UpdateAppointmentController } from "../../controllers/AppointmentController/UpdateAppointmentController";

const userRepository = new IPrismaUserRepository()
const serviceRepository = new IPrismaServiceRepository()
const appointmentRepository = new IPrismaAppointmentRepository()
const createNotificationByEmail = new CreateNotificationByEmail()

const createAppointmentUseCase = new CreateAppointmentUseCase(appointmentRepository, userRepository, serviceRepository, createNotificationByEmail)
const updateAppointmentUseCase = new UpdateAppointmentUseCase(appointmentRepository)
const indexAppointmentUseCase = new IndexAppointmentUseCase(appointmentRepository)
const deleteAppointmentUseCase = new DeleteAppointmentUseCase(appointmentRepository)

export const createAppointmentController = new CreateAppointmentController(createAppointmentUseCase)
export const updateAppointmentController = new UpdateAppointmentController(updateAppointmentUseCase)
export const indexAppointmentController = new IndexAppointmentController(indexAppointmentUseCase)
export const deleteAppointmentController = new DeleteAppointmentController(deleteAppointmentUseCase)