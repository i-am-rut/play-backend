import { Router } from "express";
import {  getCurrentUser, logout, registerUser, signInUser } from "../controllers/user.controllers.js";
import registerUserSchema from "../schemas/auth/registerUserSchema.js"
import validate from "../middlewares/validate.js"
import { upload } from "../middlewares/multer.middleware.js"
import signInSchema from "../schemas/auth/signInUserSchema.js";
import verifyJWT from "../middlewares/auth.middleware.js";

const router = Router()

router.post('/register', upload.fields([{ name: "avatar", maxCount: 1 }, { name: "coverImage", maxCount: 1 }]), validate(registerUserSchema), registerUser)
router.post("/sign-in", validate(signInSchema), signInUser)
router.post("/logout", logout)

router.get("/me",verifyJWT, getCurrentUser)

export default router