import app from "./app.js";
import { connectMongoDB } from "./config/mongoDB.config.js"

const startServer = async () => {
    try{
        await connectMongoDB()
        app.listen(
            3000, 
            () => {
                console.log('Nuestra app se escucha en el puerto 3000')
            }
        )
    }
    catch(error){
        console.error("Error starting server:", error);
    }
}

export default startServer