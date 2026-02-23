import { Router } from "express";
import registerUserSchema from "../schemas/auth/registerUserSchema.js"
import signInSchema from "../schemas/auth/signInUserSchema.js"
import changePasswordSchema from "../schemas/auth/changePasswordSchema.js"

import validate from "../middlewares/validate.js"
import { upload } from "../middlewares/multer.middleware.js"
import verifyJWT from "../middlewares/auth.middleware.js"

import { changeCurrentPassword, getCurrentUser, logout, refreshAccessToken, registerUser, signInUser } from "../controllers/user.controllers.js";
import { changePasswordLimiter, getCurrentUserLimiter, logoutLimiter, refreshAccessTokenLimiter, registerLimiter, signInLimiter } from "../utils/rateLimitUtils/userRateLimits.js";


const router = Router()

router.post('/register', registerLimiter,
    upload.fields([
        { name: "avatar", maxCount: 1 },
        { name: "coverImage", maxCount: 1 }
    ]),
    validate(registerUserSchema),
    registerUser
)
router.post("/sign-in", signInLimiter, validate(signInSchema), signInUser)
router.post("/logout", logoutLimiter, verifyJWT, logout)
router.get("/refresh-access-token", refreshAccessTokenLimiter, refreshAccessToken)

router.post("/change-password", changePasswordLimiter, validate(changePasswordSchema), verifyJWT, changeCurrentPassword)
router.get("/me", getCurrentUserLimiter, verifyJWT, getCurrentUser)

export default router