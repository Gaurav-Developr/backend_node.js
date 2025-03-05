import { v2 as cloudinary } from "cloudinary";  //import cloudinary, fs.
import fs from "fs"; // fs(filesystem)
// use cloudinary for upload files on cloudinary and use only its url. and save url on our database. 
cloudinary.config({ 
    cloud_name: 'process.env.CLOUDINARY_CLOUD_NAME', 
    api_key: 'process.env.CLOUDINARY_API_KEY', //538129838764387
    api_secret: 'process.env.CLOUDINARY_API_SECRET' // Click 'View API Keys' above to copy your API secret
});

const uploadOnCloudinary = async (localpath)=>{
    try {
        if(!localpath) return null
        // agr localpath mil jaye(upload the file on cloudinary):
        const response = await cloudinary.uploader.upload(localpath,{resource_type:"auto"})
        //agr file successfully upload hojaye(file has been uploaded successfully)
        console.log("file has been successfully uploaded on cloudinary",response.url)
        return response
        
    } catch (error) {
        fs.unlinkSync(localpath)  //remove the locally saved temprory file as the upload opertion got failed/
        return null;
    }
}

export { uploadOnCloudinary }
