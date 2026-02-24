import { z } from "zod"
import userRequirements from "../../utils/SchemaUtils/user/index.js"

const usernameSchema = z
    .string()
    .min(userRequirements.username.min, `Username must be at least ${userRequirements.username.min} characters`)
    .max(userRequirements.username.max, `Username must be at no more than ${userRequirements.username.max} characters`)
    .trim()
    .regex(/^(?=.*[a-z])[a-z0-9_.]+$/,
        "Username can only contain lowercase letters (a-z), numbers (0-9), underscore (_) and period (.), and must contain at least one letter"
    )

export default usernameSchema