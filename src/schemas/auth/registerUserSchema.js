import { z } from "zod"
import userRequirements from "../../utils/SchemaUtils/user/index.js"

const registerSchema = z.object({
    body: z.object({
        username: z
            .string()
            .min(userRequirements.username.min, `Username must be at least ${userRequirements.username.min} characters`)
            .max(userRequirements.username.max, `Username must be at most ${userRequirements.username.max} characters`)
            .trim()
            .regex(/^[A-Za-z0-9_]/, "Must not start with special character other than underscore '_'"),

        email: z
            .string()
            .email("Invalid email format")
            .toLowerCase()
            .trim(),

        fullName: z
            .string()
            .min(userRequirements.fullName.min, `Full name must be at least ${userRequirements.fullName.min} characters`)
            .max(userRequirements.fullName.max, `Full name must be at most ${userRequirements.fullName.max} characters`)
            .trim()
            .regex(/^[A-Za-z0-9_]/, "Must not start with special character other than underscore '_'"),

        password: z
            .string()
            .regex(/[A-Z]/, "Must contain uppercase letter")
            .regex(/[a-z]/, "Must contain lowercase letter")
            .regex(/[0-9]/, "Must contain number")
            .regex(/[^A-Za-z0-9]/, "Must contain special character")
            .min(8, "Must be at least 8 characters")
            .max(32, "Must be no more than 32 characters")
    }).strict(), // req data will only have body so this is strict
    query: z.object({}).optional(), //these will be empty objects for register user so they are optional 
    params: z.object({}).optional()
}).strict() // keeping the whole thing strict is better in production so nothing slips out unvalidated

export default registerSchema

