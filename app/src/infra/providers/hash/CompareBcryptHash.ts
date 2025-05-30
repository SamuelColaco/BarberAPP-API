import { compare } from "bcrypt";
import { ICompareHash } from "../../../domain/interfaces/ICompareHash";

export class CompareBcryptHash implements ICompareHash{
    async compare(password: string, passwordHash: string): Promise<boolean> {
        const passwordTrue = await compare(password, passwordHash)

        return passwordTrue
    }
}