import { User } from "../models/user.model.js"
import ApiError from "../utils/ApiUtils/ApiError.js"
import { ApiResponse } from "../utils/ApiUtils/ApiResponse.js"
import { uploadToCloudinary } from "../utils/cloudinary/index.js"


const registerUser = async (req, res) => {
    const { username, email, fullName, password } = req.body


    const avatarLocalPath = req.files?.avatar && req.files?.avatar[0]?.path
    const coverImageLocalPath = req.files?.coverImage && req.files?.coverImage[0]?.path

    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar image is required")
    }

    const avatar = avatarLocalPath &&
        await uploadToCloudinary(avatarLocalPath, "avatars", {
            width: 400,
            height: 400,
            crop: "thumb",
            gravity: "face",
            radius: "max",
            quality: "auto",
            fetch_format: "auto",
            effect: "improve"
        })
    const coverImage = coverImageLocalPath &&
        await uploadToCloudinary(coverImageLocalPath, "coverImages", {
            width: 1500,
            height: 450,
            crop: "fill",
            gravity: "auto",
            quality: "auto",
            fetch_format: "auto",
            effect: "improve"
        })

    const user = await User.create({
        username,
        email,
        fullName,
        password,
        avatar: avatar?.secure_url || "",
        coverImage: coverImage?.secure_url || ""
    })

    return res.status(201).json(new ApiResponse(201, "User registered Successfully", {
        _id: user._id,
        username: user.username,
        fullName: user.fullName,
        email: user.email,
        updatedAt: user.updatedAt,
    }))
}


// Use whenever there is need to delete or replace the image or video
// const deleteResource = async(req, res) => {
//     try {
//         const {url} = req.body
//         const result = await deleteCloudinaryResource(url)
//         return res.status(200).json(new ApiResponse(200, "Resource deleted successfully", result))
//     } catch (error) {
//         throw new ApiError(502, "Failed to delete resource 2", error)
//     }
// }

export {
    registerUser
}