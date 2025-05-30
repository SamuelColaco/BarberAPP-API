import { JwtPayload, verify } from "jsonwebtoken";
import { IVerifyToken } from "../../../domain/interfaces/IVerifyToken";



export class CreateVerifyJwtToken implements IVerifyToken{
    
    private secret = process.env.AUTH_SECRET || "secret"

    verify(authHeaderToken: string): string | JwtPayload {
        
        return verify(authHeaderToken, this.secret)
    }
}