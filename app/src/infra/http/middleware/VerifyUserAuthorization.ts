
import { NextFunction, Request, Response } from "express"
import { AppError } from "../../../utils/AppError"

export function verifyUserAuthorization(roles: string[]){
    return (req: Request, res: Response, next: NextFunction) => {

        if(!req.user?.id){
            throw new AppError("User no authenticated", 401)
        }

        if(!roles.includes(req.user.role)){
            throw new AppError("You no have authorization for this action", 403)
        }

        return next()
        
    }
}