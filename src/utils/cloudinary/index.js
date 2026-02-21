import { v2 as cloudinary } from 'cloudinary';
import fs from "fs"
import ApiError from '../ApiUtils/ApiError.js';
import urlToPublicId from './urlToPublicId.js';


// const unlinkAsync = (path) => new Promise((resolve, reject) => {
//   fs.unlink(path, (err) => {
//     if (err) reject(err)
//     else resolve()
//   })
// })

//folders : images, videos, avatars, coverImages, thumbnails
export const uploadToCloudinary = async (localFilePath, folder = "general", transformation = {}) => {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET
    })
    if (!localFilePath) return null

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
      folder,
      ...transformation
    })

    fs.unlinkSync(localFilePath);

    return response

  } catch (error) {
    if (localFilePath) {
      fs.unlinkSync(localFilePath).catch(() => { })
    }
    throw new ApiError(502, "Cloudinary upload failed", {
      status: error.http_code || 502,
      message: error.message
    })
  }
}



export const deleteCloudinaryResource = async (imageUrl) => {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET
    })
    const publicId = urlToPublicId(imageUrl)
    console.log(publicId)
    const response = await cloudinary.uploader.destroy(publicId, (err, res) => {
      if (err) {
        console.log(err)
      } else {
        console.log(res)
      }
    })
    return response
  } catch (error) {
    throw new ApiError(502, "Failed to delete resource", error)
  }
}