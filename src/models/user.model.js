import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    username:{
        type:String,
        required:true,
        lowercase:true,
        unique:true,
        trim:true,
        index:true
    },
    email:{
        type:String,
        required:true,
        lowercase:true,
        unique:true,
        trim:true
    },
    fullname:{
        type:String,
        required:true,
        trim:true,
        index:true
    },
    avatar:{
        type:String,   //cloudinary url(third party m rakhte hai bas vha URL aajata hai)
        required:true,
    },
    coverImage:{
        type:String, //cloudinary url(third party m rakhte hai bas vha URL aajata hai)
    },
    watchHistory:[
        {
            type:Schema.Types.ObjectId,
            ref:"Video"
        }
    ],
    password:{
        type:String,
        required:[true,"Password is required"]
    },
    refreshToken:{
        type:string
    }
},{timestamps:true})


export const User = mongoose.model("User",userSchema)
