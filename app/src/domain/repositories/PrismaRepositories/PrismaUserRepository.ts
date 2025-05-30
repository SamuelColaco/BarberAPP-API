import { UserMapper } from "../../../infra/mappers/UserMapper";
import { prisma } from "../../../prisma";
import { User } from "../../entities/User";
import { IUserRepository } from "../UserRepository";

export class IPrismaUserRepository implements IUserRepository{
    async findByEmail(email: string): Promise<User | null> {
        const userExist = await prisma.user.findFirst({ where: { email }})

        if(!userExist){
            return null
        }

        return UserMapper.toDomain(userExist)

    }

    async findById(id: string): Promise<User | null> {
        const userExist = await prisma.user.findFirst({ where: { id }})

        if(!userExist){
            return null
        }

        return UserMapper.toDomain(userExist)
    }

    async findAll(): Promise<User[]> {
        const userExist = await prisma.user.findMany()

        return UserMapper.toDomainManyUsers(userExist)
    }

    async delete({ id }: User): Promise<void> {
        await prisma.user.delete({ where: { id }})
    }

    async update({ id, ...all}: User): Promise<void> {
        await prisma.user.update({ where: { id }, data:{ ...all}})
    }

    async save(user: User): Promise<void> {
        await prisma.user.create({ data: { name: user.name, email: user.email, passwordHash: user.passwordHash, role: user.role}})
    }
}