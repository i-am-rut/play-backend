import { z } from "zod"
import passwordSchema from "../common/password.schema.js"

const changePasswordSchema = z.object({
    body: z.object({
        password: passwordSchema,
        newPassword: passwordSchema
    }).strict(),
    query: z.object({}).optional(),
    params: z.object({}).optional()
}).strict()

export default changePasswordSchema