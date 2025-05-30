
import  { Router } from "express"

import * as serviceController from "../routes/routesConfig/serviceRoutesConfig"
import { ensureAutheticated } from "../middleware/EnsureAutheticated"
import { CreateVerifyJwtToken } from "../../providers/jwt/CreateVerifyJwtToken"
import { verifyUserAuthorization } from "../middleware/VerifyUserAuthorization"

const serviceRoutes = Router()
const verifyJwtToken = new CreateVerifyJwtToken()

serviceRoutes.get("/service", ensureAutheticated(verifyJwtToken), serviceController.indexServiceController.index.bind(serviceController.indexServiceController))
serviceRoutes.post("/service/:barberId", ensureAutheticated(verifyJwtToken), verifyUserAuthorization(["barber"]), serviceController.createServiceController.create.bind(serviceController.createServiceController))
serviceRoutes.put("/service/:id", ensureAutheticated(verifyJwtToken), verifyUserAuthorization(["barber"]), serviceController.updateServiceController.update.bind(serviceController.updateServiceController))
serviceRoutes.delete("/service/:id", ensureAutheticated(verifyJwtToken), verifyUserAuthorization(["barber"]), serviceController.deleteServiceController.deleteService.bind(serviceController.deleteServiceController))

export { serviceRoutes }