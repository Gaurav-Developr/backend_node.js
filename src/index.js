// import mongoose from "mongoose";
// import { DB_NAME } from "./constants";
import  db  from "./db/db.js";
import dotenv from "dotenv";

dotenv.config({
    path:"./env"
})


db()


// ;( async () => {
//     try {
//         await mongoose.connect(`${process.env.MongoDB_URI}/${DB_NAME}`,)
//     } catch (error) {
//         console.log("Error on Database connection",error)
//     }
// })()