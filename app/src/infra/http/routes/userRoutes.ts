
import { Router } from "express"
import * as userController from "../routes/routesConfig/userRoutesConfig"
import { CreateVerifyJwtToken } from "../../providers/jwt/CreateVerifyJwtToken"
import { ensureAutheticated } from "../middleware/EnsureAutheticated"
import { verifyUserAuthorization } from "../middleware/VerifyUserAuthorization"

const userRoutes = Router()
const verifyJwtToken = new CreateVerifyJwtToken()

userRoutes.get("/user", ensureAutheticated(verifyJwtToken),verifyUserAuthorization(["barber","client"]), userController.indexUserController.index.bind(userController.indexUserController))

userRoutes.post("/user", userController.createUserController.create.bind(userController.createUserController))

userRoutes.put("/user/:id", ensureAutheticated(verifyJwtToken), verifyUserAuthorization(["barber"]), userController.updateUserController.update.bind(userController.updateUserController))

userRoutes.delete("/user/:id", ensureAutheticated(verifyJwtToken), verifyUserAuthorization(["barber"]), userController.deleteUserController.deleteUser.bind(userController.deleteUserController))

export { userRoutes }