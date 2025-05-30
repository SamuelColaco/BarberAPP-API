import { hash } from "bcrypt";
import { IHashProvider } from "../../../domain/interfaces/IHashProvider";

export class CreateBcryptHash implements IHashProvider{
    async hash(password: string): Promise<string> {
        const passwordHash = await hash(password, 8)

        return passwordHash
    }
}