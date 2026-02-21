import { ZodError } from "zod"
import mongoose from "mongoose"
import multer from "multer"
import ApiError from "../utils/ApiUtils/ApiError.js"

const globalErrorHandler = (err, req, res, next) => {
    // If response already sent, delegate to Express default handler
    if (res.headersSent) {
        return next(err)
    }

    let statusCode = 500
    let message = "Internal Server Error"
    let data = null

    // Custom ApiError
    if (err instanceof ApiError) {
        statusCode = err.statusCode || 500
        message = err.message
        data = err.errors || null
    }

    // Zod Validation Error
    else if (err instanceof ZodError) {
        const errors = Object.values(JSON.parse(err.message).map(e => ({
            field: e.path[1],
            message: e.message
        })).reduce((acc, { field, message }) => ({
            ...acc,
            [field]: acc[field]
                ? { field, message: acc[field].message + ", " + message }
                : { field, message }
        }), {}))
        statusCode = 400
        message = "Validation failed"
        data = errors
    }

    // Mongoose Validation Error
    else if (err instanceof mongoose.Error.ValidationError) {
        statusCode = 400
        message = "Database validation failed"
        data = Object.values(err.errors).map(e => ({
            field: e.path,
            message: e.message
        }))
    }

    // Mongoose CastError (invalid ObjectId)
    else if (err instanceof mongoose.Error.CastError) {
        statusCode = 400
        message = `Invalid ${err.path}: ${err.value}`
    }

    // Duplicate Key Error (Mongo)
    else if (err.code === 11000) {
        statusCode = 409
        message = `Duplicate field value entered`
        data = Object.keys(err.keyValue).map(field => ({
            field,
            message: `${field} already exists`
        }))
    }

    // Multer errors
    else if (err instanceof multer.MulterError) {
        statusCode = 400
        message = err.message
        data = null
    }

    // Log error in development
    if (process.env.NODE_ENV === "development") {
        console.error("DEVELOPMENT ERROR:", err)
    }

    return res.status(statusCode).json({
        success: false,
        message,
        data,
        ...(process.env.NODE_ENV === "development" && { stack: err.stack })
    })
}

export default globalErrorHandler