import { v2 as cloudinary } from "cloudinary";
import fs from 'fs' // File System // comes in by default with Node


// unlink means remove the file / delete the file

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY // 
});


const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null

        // upload file on cloudinary
        const res = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })

        // file has been uploaded successful
        fs.unlinkSync(localFilePath)
        return res

    } catch (error) {
        fs.unlinkSync(localFilePath) // remove the locally saved temporarily file as the upload operation got failed
        return null
    }
}

export { uploadOnCloudinary }

