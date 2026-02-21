import express from 'express';
import dotenv from "dotenv"
import cookieParser from 'cookie-parser';
import cors from "cors"
import { API_BASE_VERSION, DEV_ORIGIN } from './constants.js';
import globalErrorHandler from './middlewares/globalErrorHandler.js';

export const app = express();

// env variables config
dotenv.config()

// various middlewares
app.use(cors({
    origin: [DEV_ORIGIN],
    credentials: true,
}))
app.use(express.json({ limit: '16kb' }))
app.use(express.urlencoded({ limit: "16kb", extended: true }))
app.use(express.static("public"))
app.use(cookieParser())


// Route handlers
import userRouter from "./routes/user.routes.js"

app.use(`${API_BASE_VERSION}/user`, userRouter)



// Global error handler middleware
app.use(globalErrorHandler)