

import { Router } from "express"
import * as sessionController from "../routes/routesConfig/sessionRoutesConfig"

const sessionRoutes = Router()

sessionRoutes.post("/session", sessionController.sessionController.create.bind(sessionController.sessionController))

export { sessionRoutes }