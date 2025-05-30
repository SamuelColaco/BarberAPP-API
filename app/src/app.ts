
import "express-async-errors"
import express from "express"
import { errorHandling } from "./infra/http/middleware/ErrorHandling"
import { userRoutes } from "./infra/http/routes/userRoutes"
import { serviceRoutes } from "./infra/http/routes/serviceRoutes"
import { appointmentRoutes } from "./infra/http/routes/appointmentRoutes"
import { sessionRoutes } from "./infra/http/routes/sessionRoutes"

const app = express()

app.use(express.json())

app.use(userRoutes)
app.use(serviceRoutes)
app.use(appointmentRoutes)
app.use(sessionRoutes)

app.use(errorHandling)

export { app }
