import mongoose from "mongoose"

const MONGO_URL = process.env.MONGO_DB_URL

export async function connectMongoDB (){
    try{
     
        await mongoose.connect(MONGO_URL)
        console.log("Conexion a MongoDB exitosa")
    }
    catch(error){
        console.error("Conexion con MongoDB fallo")
        console.error(error)
    }
    
}

