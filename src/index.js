import  db  from "./db/db.js";
import dotenv from "dotenv";
import { app } from "./app.js";

dotenv.config({
    path:"./env"
})

db()
    .then(()=> {
    app.listen(process.env.Port ||8000, () =>{
        console.log(`Server is running on port ${process.env.Port}`);
    } )
    })
    .catch((error) => {
    console.log("Database connection error on index.js file !!",error)
    }
    )


// ;( async () => {
//     try {
//         await mongoose.connect(`${process.env.MongoDB_URI}/${DB_NAME}`,)
//     } catch (error) {
//         console.log("Error on Database connection",error)
//     }
// })()