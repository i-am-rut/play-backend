import { v2 as cloudinary } from 'cloudinary';
import fs from "fs"
import { ApiError } from '../ApiUtils/ApiError.js';


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

const unlinkAsync = (path) => new Promise((resolve, reject) => {
  fs.unlink(path, (err) => {
    if (err) reject(err)
    else resolve()
  })
})

export const uploadToCloudinary = async (localFilePath, folder = "general") => {
  try {
    if (!localFilePath) return null

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
      folder
    })

    await unlinkAsync(localFilePath);

    return response

  } catch (error) {
    if (localFilePath) {
      await unlinkAsync(localFilePath).catch(() => { })
    }
    throw new ApiError(502, "Cloudinary upload failed", error)
  }
}
