
import { Router } from "express"
import * as appointmentController from "../routes/routesConfig/appointmentRoutesConfig"
import { ensureAutheticated } from "../middleware/EnsureAutheticated"
import { CreateVerifyJwtToken } from "../../providers/jwt/CreateVerifyJwtToken"
import { verifyUserAuthorization } from "../middleware/VerifyUserAuthorization"

const appointmentRoutes = Router()
const verifyJwtToken = new CreateVerifyJwtToken()

appointmentRoutes.get("/appointment", ensureAutheticated(verifyJwtToken), verifyUserAuthorization(["barber","client"]), appointmentController.indexAppointmentController.index.bind(appointmentController.indexAppointmentController))

appointmentRoutes.post("/appointment/:barberId/:clientId/:serviceId", ensureAutheticated(verifyJwtToken), appointmentController.createAppointmentController.create.bind(appointmentController.createAppointmentController))

appointmentRoutes.put("/appointment/:id", ensureAutheticated(verifyJwtToken), appointmentController.updateAppointmentController.update.bind(appointmentController.updateAppointmentController))

appointmentRoutes.delete("/appointment/:id",ensureAutheticated(verifyJwtToken), verifyUserAuthorization(["barber"]), appointmentController.deleteAppointmentController.deleteAppointment.bind(appointmentController.deleteAppointmentController))

export { appointmentRoutes }