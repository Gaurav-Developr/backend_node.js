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
        type:String,   //cloudinary url(third party m rakhte hai bas vha s URL aajata hai)
        required:true,
    },
    coverImage:{
        type:String, //cloudinary url(third party m rakhte hai bas vha s URL aajata hai)
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
//*******    MIDDLEWARE *****jane s phle mujse milkr ja(means hme kuchb save karna hai databse m to just save hone s phle mujse milkr jana hoga)
// hooks pre ko hooks bolte hai yeh middleware he hote aur middleware me hm pre (this."yeh hooks hote hai") hooks ka use karrhe hai.(data save hone s phle yeh hooks chle)
// password incript before save on my database
userSchema.pre("save", async function (next){
    if(!this.isModified("password"))return next();
    this.password = bcrypt.hash(this.password, 10)
    next()
})
// compare password (check user password and incript password is same)
userSchema.methods.isPasswordCorrect= async function(password){
    return await bcrypt.compare(password,this.password)
}
// apne methods inject karne 
// Generate ** JWT ** Token (for create jwt token to sharing data)
userSchema.methods.generateAccessToken = async function(){
return Jwt.sign({
    _id:this._id,
    username:this.username,
    fullname:this.fullname,
    email:this.email,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    }
)
}
// Generate ** JWT ** Refresh Token 
userSchema.methods.generateRefreshToken = async function(){
    jwt.sign({
        _id:this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn:process.env.REFRESH_TOKEN_EXPIRY
    }
)
}

export const User = mongoose.model("User",userSchema)
