import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) =>{
    // ----- Steps ------ //
    //1 - get user details from frontend
    //2 - validation(empty or not)
    //3 - if user already exists or not :email,name
    //4 - check for images, check for avatar
    //5 - upload for cloudinary, avatar (after this get url)
    //6 - create user object  - create entry in db
    //7 - remove password field and refresh_token field from response
    //8 - check for user creation
    //9 - if user create succesfully send response on frontend
    //10 - avatar, coverImage, watchHistory, refreshToken
    const {fullname, username, email, password} =req.body
    if([fullname, username, email, password].some((field)=>fields?.trim()==="")){
        throw new ApiError(400,"All field required")
    }
    // console.log("fullname:",fullname,"username: ", username, "email: ",email,"password: ", password)
    const existeduser = User.findOne({
        $or: [{ username },{ email }]
    })
    console.log(existeduser)
    if (existeduser){
        throw new ApiError(409,"User with username or email already exists")
    }
//handel avatar with multerfile and give me multerfeature file and give me path.
const avatarlocalpath = req.files?.avatar[0]?.path; //file k andr (avatar/images) k 0 index k andr ka path. yeh abhi server par hai abhi yeh cloudinary par nhi gaya hai
const coverImagelocalpath = req.files?.coverImage[0]?.path;

if (!avatarlocalpath){
    throw new ApiError(400,"Avatar file is required")
}
 
if(!coverImagelocalpath){
    throw new ApiError(400,"Image file is required")
}

 const avatar = await uploadOnCloudinary(avatarlocalpath)  
 const coverImage = await uploadOnCloudinary(coverImagelocalpath) 

 if(avatar){
    throw new ApiError(400,"Avatar file is required")
 }
// create user on database
 const user = await User.create({
    fullname,
    username:username.toLowerCase(),
    avatar:avatar.url,
    coverImage:coverImage?.url || "",
    email,
    password,

 })
// check user is created or not (find by _id and not show pswd and ref token)
 const createduser = await User.findByid(User._id).select(
    "-password -refreshToken"
 )
// if user is not created on database
if(!createduser){
    throw new ApiError(500,"Something went wrong while register the user on database")
}
// return response throw api on user
return res.status(200).json(
    new ApiResponse(200, createduser, "User created Successfully")
)

    
})



export { registerUser }  