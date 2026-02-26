import {Router} from "express"

import firePointSchema from "../schemas/tweets/firePointSchema.js"
import editPointSchema from "../schemas/tweets/editPointSchema.js"

import verifyJWT from "../middlewares/auth.middleware.js"
import validate from "../middlewares/validate.js"

import { editPointRateLimit, firePointRateLimit } from "../utils/rateLimitUtils/pointRateLimit.js"
import { editPoint, firePoint } from "../controllers/point.controllers.js" //getUserPoints

const router = Router()

router.post("/fire-point", firePointRateLimit, verifyJWT, validate(firePointSchema), firePoint)
router.patch("/edit-point/:_id", editPointRateLimit, verifyJWT, validate(editPointSchema), editPoint)

// router.get("/user-points/:_id", getUserPoints)

export default router