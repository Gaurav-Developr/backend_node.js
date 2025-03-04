import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";


const videoSchema = new mongoose.Schema({
    Video:{
        type:String,     // cloudinary URL
        required:true
    },
    thumbnails:{
        type:String,     // cloudinary URL
        required:true
    },
    title:{
        type:String,    
        required:true
    },
    thumbnails:{
        type:String,   
        required:true
    },
    duration:{
        type:Number,
    },
    views:{
        type:Number,
        default:0
    },
    isPublished:{
        type:Boolean,
        default:true
    },
    owner:{
        type:Schema.Types.ObjectId,
        ref: "User"
    }

},{timestamps:true})



videoSchema.plugin(mongooseAggregatePaginate)
export const Video = mongoose.model("Video",videoSchema)