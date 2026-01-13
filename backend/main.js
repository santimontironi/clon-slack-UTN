import { connectMongoDB } from "./config/mongoDB.config.js"
import express from 'express'
import authRouter from "./routes/auth-routes.js"

connectMongoDB()

//Crear un servidor web (Express app)
const app = express()

//Habilita a mi servidor a recibir json por body
app.use(express.json())

app.use("/api/auth", authRouter)

app.listen(
    3000, 
    () => {
        console.log('Nuestra app se escucha en el puerto 3000')
    }
)