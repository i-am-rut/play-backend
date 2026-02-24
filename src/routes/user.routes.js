import { Router } from "express";
import registerUserSchema from "../schemas/auth/registerUserSchema.js"
import signInSchema from "../schemas/auth/signInUserSchema.js"
import changePasswordSchema from "../schemas/auth/changePasswordSchema.js"
import updateUserDetailsSchema from "../schemas/user/updateUserDetailsSchema.js"

import validate from "../middlewares/validate.js"
import { upload } from "../middlewares/multer.middleware.js"
import verifyJWT from "../middlewares/auth.middleware.js"

import { changeCurrentPassword, getCurrentUser, logout, refreshAccessToken, registerUser, signInUser, updateUserDetails } from "../controllers/user.controllers.js";
import { changePasswordLimiter, getCurrentUserLimiter, logoutLimiter, refreshAccessTokenLimiter, registerLimiter, signInLimiter, updateUserDetailsLimiter } from "../utils/rateLimitUtils/userRateLimits.js";


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
router.get("/refresh-access-token", refreshAccessTokenLimiter, refreshAccessToken)
router.post("/logout", logoutLimiter, verifyJWT, logout)

router.post("/change-password", changePasswordLimiter, validate(changePasswordSchema), verifyJWT, changeCurrentPassword)
router.get("/me", getCurrentUserLimiter, verifyJWT, getCurrentUser)
router.patch("/update-user-details", updateUserDetailsLimiter, validate(updateUserDetailsSchema), verifyJWT, updateUserDetails)

export default router