import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from "cookie-parser";
import workspaceRouter from "./routes/workspaces-routes.js"
import authRouter from "./routes/auth-routes.js"

dotenv.config()

//Crear un servidor web (Express app)
const app = express()

//Habilita a mi servidor a recibir json por body
app.use(express.json())

//Habilita a mi servidor a recibir cookies
app.use(cookieParser());

//Configurar CORS
app.use(cors({
    origin: [
        process.env.FRONTEND_URL
    ],
    credentials: true,
    methods: ["GET", "POST", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}))

//Rutas
app.use("/api/auth", authRouter)
app.use("/api/workspaces", workspaceRouter)

export default app