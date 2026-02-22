import bcrypt from "bcrypt"

import { COOKIE_OPTIONS, TOKEN_TYPES } from "../constants.js"
import { User } from "../models/user.model.js"
import ApiError from "../utils/ApiUtils/ApiError.js"
import { ApiResponse } from "../utils/ApiUtils/ApiResponse.js"
import { uploadToCloudinary } from "../utils/cloudinary/index.js"

const generateAccessAndRefreshTokens = async (userId) => {

    const user = await User.findById(userId)
    const accessToken = user.generateAccessToken()
    const refreshTokenPlain = user.generateRefreshToken()

    const refreshTokenHashed = await bcrypt.hash(refreshTokenPlain, 10)

    user.refreshToken = refreshTokenHashed
    await user.save({ validateBeforeSave: false })

    return { accessToken, refreshToken: refreshTokenPlain }
}

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


const signInUser = async (req, res) => {
    const { identifier, password } = req.body

    const user = await User.findOne({
        $or: [{ email: identifier }, { username: identifier }]
    })

    if (!user) {
        await bcrypt.compare(password, process.env.SOME_RANDOM_HASH) // to protect from timing attack
        throw new ApiError(401, "Invalid credentials")
    }

    const isPasswordValid = await user.isPasswordCorrect(password)

    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid credentials")
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id)

    return res
        .status(200)
        .cookie("accessToken", accessToken, COOKIE_OPTIONS)
        .cookie("refreshToken", refreshToken, COOKIE_OPTIONS)
        .json(new ApiResponse(200, "Logged in successfully", user))

    // Login rate limiting (e.g., 5 attempts / 15 min)
    // Account lock after X failed attempts
    // Device/session tracking
    // IP logging
    // Optional 2FA
}


const logout = async (req, res) => {

    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1
            }
        }, { new: true }
    )

    res.status(200)
        .clearCookie("accessToken", COOKIE_OPTIONS)
        .clearCookie("refreshToken", COOKIE_OPTIONS)
        .json(new ApiResponse(200, "Logged out successfully"))
}

const getCurrentUser = (req, res) => {
    return res.status(200).json(new ApiResponse(200, "User fetched successfully", req.user))
}

const refreshAccessToken = async (req, res, next) => {
    try {
        const token = req.cookies.refreshToken

        if (!token) {
            throw new ApiError(401, "Invalid refresh token", {}, "INVALID_REFRESH_TOKEN")
        }

        const decoded = jwt.verify(token, process.env.REFRESH_SECRET)
        const user = await User.findById(decoded._id)
        if(!user) {
            throw new ApiError(401, "Invalid refresh token", {}, "INVALID_REFRESH_TOKEN")
            
        }

        if (!user.refreshToken) {
            throw new ApiError(401, "Invalid refresh token", {}, "INVALID_REFRESH_TOKEN")
        }

        const isValid = await bcrypt.compare(token, user.refreshToken)
        if(!isValid) {
            throw new ApiError(401, "Invalid refresh token", {}, "INVALID_REFRESH_TOKEN")
        }

        const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(decoded._id)
        return res
            .status(200)
            .cookie("accessToken", accessToken, COOKIE_OPTIONS)
            .cookie("refreshToken", refreshToken, COOKIE_OPTIONS)
            .json(new ApiResponse(200, "Access token refreshed"))

    } catch (err) {
        if (err.name === "TokenExpiredError" || err.name === "JsonWebTokenError") {
            err.tokenType = TOKEN_TYPES.REFRESH
        }
        next(err)
    }
}


// Use whenever there is need to delete or replace the image or video resource (needs resource url)
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
    registerUser,
    signInUser,
    logout,
    getCurrentUser,
    refreshAccessToken
}