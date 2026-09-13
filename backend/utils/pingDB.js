import mongoose from "mongoose"
import "dotenv/config"

const MONGO_URL = process.env.MONGO_DB_URL

async function pingDB() {
    if (!MONGO_URL) {
        console.error("MONGO_DB_URL no esta definida")
        process.exit(1)
    }

    try {
        await mongoose.connect(MONGO_URL)
        await mongoose.connection.db.admin().ping()
        console.log("Ping a MongoDB exitoso")
        await mongoose.disconnect()
        process.exit(0)
    } catch (error) {
        console.error("Ping a MongoDB fallo")
        console.error(error)
        process.exit(1)
    }
}

pingDB()
