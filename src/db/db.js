import mongoose from "mongoose";
import express from "express";
import { DB_NAME } from "../constants.js"
const app = express()

const db = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`/n MongoDB connected !! , Host ${connectionInstance.connection.host}`)
    } catch (error) {
        console.log("ERROR ON MONGODB CONNECTION !! ",error)
        process.exit(1)
    }
}

export default db;