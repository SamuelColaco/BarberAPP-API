import { IndexUserUseCase } from "../../../../useCases/UserUseCase/IndexUserUseCase/IndexUserUseCase";
import { Request, Response } from "express"

export class IndexUserController{

    constructor(
        private indexUserUseCase: IndexUserUseCase 
    ){}

    async index(req: Request, res: Response){
        
        
        const users = await this.indexUserUseCase.execute()

        res.status(200).json({ message: users.length > 0 ? users : "No users in database"})
    }
}