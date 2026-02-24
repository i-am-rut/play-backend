import { z } from "zod"
import userRequirements from "../../utils/SchemaUtils/user/index.js"

const passwordSchema = z
    .string()
    .trim()
    .regex(/[A-Z]/, "Must contain uppercase letter")
    .regex(/[a-z]/, "Must contain lowercase letter")
    .regex(/[0-9]/, "Must contain number")
    .regex(/[^A-Za-z0-9]/, "Must contain special character")
    .min(userRequirements.password.min, `Password must be at least ${userRequirements.password.min} characters`)
    .max(userRequirements.password.max, `Password must be no more than ${userRequirements.password.max} characters`)

export default passwordSchema