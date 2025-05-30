
import { User as DomainUser } from "../../domain/entities/User";
import { UserRole as DomainUserRole } from "../../domain/enums/UserRole";
import { User as PrismaUser , UserRole as PrismaUserRole } from "@prisma/client";

export class UserMapper{
    static toDomain(prismaUser: PrismaUser ){
        return new DomainUser({
            name: prismaUser.name,
            email: prismaUser.email,
            passwordHash: prismaUser.passwordHash,
            role: prismaUser.role as DomainUserRole
        }, prismaUser.id)
    }

    static toPrisma(domainUser: DomainUser){
        return domainUser.role as PrismaUserRole
    }

    static toDomainManyUsers(prismaUser: PrismaUser[]){

        return prismaUser.map(user => new DomainUser({
                name: user.name,
                email: user.email,
                passwordHash: user.passwordHash,
                role: user.role as DomainUserRole
            }, user.id)
        )
    }
}
