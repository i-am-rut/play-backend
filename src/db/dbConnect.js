import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

export default async function dbConnect() {
    try {
        const connection = await mongoose.connect(`${process.env.MONGODB_URI}${DB_NAME}`)

        console.log(`MongoDB connected to ${(connection.connections[0]?.name).toUpperCase()} database with host: ${connection.connections[0]?.host}`)
        
    } catch (err) {
        console.log("Failed to connect to the database: ", err )
        process.exit(1)
    }
}