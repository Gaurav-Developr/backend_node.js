import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))
// *******  app.use(.use)  ************ hmesa confirgation ya middleware k liye use me aata hai 
// app(express) uses json and make limit otherwise you got more and more json file so one time your server will crash so i am use limit
app.use(express.json({limit:"16kb"}))
// url s data lene k liye urlencoded ka use karte hai jo bhi data url s aayea(upr wale url s)(with use confirgation)
app.use(express.urlencoded({extended: true, limit:"16kb"}))
//pdf/image file ko store karne k liye apne server me he on over public folder(with use confirgation)
app.use(express.static("public"))
//isse hm apne server(ya server s he) s, user k browser s cookie le b skte hai aur usme crud operation b perform karskte hai
app.use(cookieParser())


// Routes Imported
import userRouter from "./routes/user.routes.js";


// routes declaration
//https:localhost:8080/api/v1/users -> iske baad yeh seedha userrouter m chle jayega jha yeh bnjayega (https:localhost:8080/api/v1/users/register)
app.use("/api/v1/users", userRouter)








export { app }