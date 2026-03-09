import express from "express"
import authRoutes from "./routes/authRoutes.js"

import swaggerUi from "swagger-ui-express"
import swaggerSpec from "./swagger/swagger.js"

const app = express()

app.use(express.json())
app.use("/auth", authRoutes)
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.get("/", (req, res) => {
  res.send("API funcionando")
})

export default app