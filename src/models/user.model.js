import { Schema, model } from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import userRequirements from "../utils/SchemaUtils/user/index.js";

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        minlength: [userRequirements.username.min, `Username should be atleast ${userRequirements.username.min} characters`],
        maxlength: [userRequirements.username.max, `Username should be no more than ${userRequirements.username.max} characters`],
        unique: true,
        trim: true,
        lowercase: true,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: userRequirements.email.lowercase,
        match: [/^\S+@\S+\.\S+$/, "Please provide a valid email"]
    },
    fullName: {
        type: String,
        required: [true, "Full name is required"],
        minlength: [userRequirements.fullName.min, `Full name should be atleast ${userRequirements.fullName.min} characters`],
        maxlength: [userRequirements.fullName.max, `Full name should be no more than ${userRequirements.fullName.max} characters`],
        trim: true,
    },
    avatar: {
        type: String, //cloudinary url
        default: userRequirements.avatar.default,
    },
    coverImage: {
        type: String, //cloudinary url
        default: userRequirements.coverImage.default,
    },
    password: {
        type: String,
        minlength: [userRequirements.password.min, `Password should be atleast ${userRequirements.password.min} characters`],
        maxlength: [userRequirements.password.max, `Password should be no more than ${userRequirements.password.max} characters`],
        required: [true, "Password is required"],
    },
    refreshToken: {
        type: String,
    }
}, { timestamps: true })

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next()
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

userSchema.pre("findOneAndUpdate", async function (next) {
    const update = this.getUpdate()
    if (!update.password) return next()
    const hashed = await bcrypt.hash(update.password, 10)
    this.setUpdate({ ...update, password: hashed })
    next()
})

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function () {
    return jwt.sign({
        _id: this._id,
        email: this.email,
        username: this.username,
        fullName: this.fullName
    }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    })
}

userSchema.methods.generateRefreshToken = function () {
    return jwt.sign({
        _id: this._id
    }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    })
}

userSchema.methods.toJSON = function () {
    const userObject = this.toObject()
    delete userObject.password
    delete userObject.refreshToken
    delete userObject.__v
    return userObject
}



export const User = model("User", userSchema)