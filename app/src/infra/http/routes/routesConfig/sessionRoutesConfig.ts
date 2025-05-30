import { IPrismaUserRepository } from "../../../../domain/repositories/PrismaRepositories/PrismaUserRepository";
import { CreateSessionUseCase } from "../../../../useCases/SessionUseCase/CreateSessionUseCase";
import { CompareBcryptHash } from "../../../providers/hash/CompareBcryptHash";
import { CreateJwtToken } from "../../../providers/jwt/CreateJwtToken";
import { SessionController } from "../../controllers/SessionController";

const userRepository = new IPrismaUserRepository()
const compareBcryptHash = new CompareBcryptHash()
const createJwtToken = new CreateJwtToken()



const createSessionUseCase = new CreateSessionUseCase(userRepository, compareBcryptHash, createJwtToken)


export const sessionController = new SessionController(createSessionUseCase)