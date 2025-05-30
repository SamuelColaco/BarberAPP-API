import { JwtPayload } from "jsonwebtoken";

export interface IVerifyToken{
    verify(authHeaderToken: string): string | JwtPayload
}