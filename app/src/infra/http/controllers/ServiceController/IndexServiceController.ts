import { IndexServiceUseCase } from "../../../../useCases/ServiceUseCase/IndexServiceUseCase/IndexServiceUseCase";

import { Request, Response } from "express"

export class IndexServiceController{

    constructor(
        private indexServiceUseCase: IndexServiceUseCase
    ){}

    async index(req: Request, res: Response){

        const service = await this.indexServiceUseCase.execute()

        res.status(200).json({ message: service.length > 0 ? service : "No have services in database"})
        
    }
}