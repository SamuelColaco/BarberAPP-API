
import { Request, Response, NextFunction } from "express"
import { AppError } from "../../../utils/AppError"
import { CreateVerifyJwtToken } from "../../providers/jwt/CreateVerifyJwtToken"
import { IVerifyToken } from "../../../domain/interfaces/IVerifyToken"

export function ensureAutheticated(verifyJwtToken: IVerifyToken){

    return (req: Request, res: Response, next: NextFunction) => {
        
            interface TokenPayload {
                role: string,
                sub: string
            }
        
            const authHeader = req.headers.authorization
        
            if(!authHeader){
                throw new AppError("User no authenticated", 401)
            }
        
            const authHeaderToken = authHeader.slice(7)
        
            const {sub: userId, role } =  verifyJwtToken.verify(authHeaderToken) as TokenPayload
        
            req.user = {
                id: userId,
                role
            }
        
            return next()
    }

}