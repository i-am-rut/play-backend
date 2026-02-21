import { Router } from "express";
import { registerUser } from "../controllers/user.controllers.js";
import registerUserSchema from "../schemas/auth/registerUserSchema.js"
import validate from "../middlewares/validate.js"
import { upload } from "../middlewares/multer.middleware.js"

const router = Router()

router.post('/register', upload.fields([{ name: "avatar", maxCount: 1 }, { name: "coverImage", maxCount: 1 }]), validate(registerUserSchema), registerUser)

export default router