import { z } from "zod"

const signInSchema = z.object({
    body: z.object({
        email: z
            .string()
            .email("Invalid email format")
            .toLowerCase()
            .trim(),

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

export default signInSchema

