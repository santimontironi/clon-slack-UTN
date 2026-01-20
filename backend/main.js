import { connectMongoDB } from "./config/mongoDB.config.js"
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from "cookie-parser";
import workspaceRouter from "./routes/workspaces-routes.js"
import authRouter from "./routes/auth-routes.js"

dotenv.config()

connectMongoDB()

//Crear un servidor web (Express app)
const app = express()

//Habilita a mi servidor a recibir json por body
app.use(express.json())

//Habilita a mi servidor a recibir cookies
app.use(cookieParser());

//Habilita a mi servidor a recibir cookies
app.use(cors(
    {
        origin: process.env.FRONTEND_URL_DEV,
        credentials: true
    }
))

//Rutas
app.use("/api/auth", authRouter)
app.use("/api/workspaces", workspaceRouter)

app.listen(
    3000, 
    () => {
        console.log('Nuestra app se escucha en el puerto 3000')
    }
)