import { ITokenProvider } from "../../../domain/interfaces/ITokenProvider";
import jwt from "jsonwebtoken"

export class CreateJwtToken implements ITokenProvider{
    private secret = process.env.AUTH_SECRET || "secret"
    private expiresIn = "1d"

    generate(payload: Record<string, unknown>, options?: { subject: string; }): string {

        return jwt.sign(payload, this.secret, {
            subject: options?.subject,
            expiresIn: this.expiresIn
        })
    }
}