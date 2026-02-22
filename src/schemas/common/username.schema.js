import { z } from "zod"
import userRequirements from "../../utils/SchemaUtils/user/index.js"

const usernameSchema = z
    .string()
    .min(userRequirements.username.min, `Username must be at least ${userRequirements.username.min} characters`)
    .max(userRequirements.username.max, `Username must be at no more than ${userRequirements.username.max} characters`)
    .trim()
    .regex(/^(?=.*[A-Za-z])[A-Za-z0-9_.]+$/,
        "Username can only contain letters, numbers, underscore (_) and period (.), and must contain at least one letter"
    )

export default usernameSchema