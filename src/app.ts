import express from "express"
import authRoutes from "./routes/authRoutes.js"

import swaggerUi from "swagger-ui-express"
import swaggerSpec from "./swagger/swagger.js"
import orderRoutes from "./routes/orderRoutes.js"

const app = express()

app.use(express.json())
app.use("/auth", authRoutes)
app.use("/", orderRoutes)
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))

export default app