import { z } from "zod"
import usernameSchema from "../common/username.schema.js"
import emailSchema from "../common/email.schema.js"
import fullNameSchema from "../common/fullName.schema.js"
import passwordSchema from "../common/password.schema.js"

const registerSchema = z.object({
    body: z.object({
        username: usernameSchema,

        email: emailSchema,

        fullName: fullNameSchema,

        password: passwordSchema
    }).strict(), // req data will only have body so this is strict
    query: z.object({}).optional(), //these will be empty objects for register user so they are optional 
    params: z.object({}).optional()
}).strict() // keeping the whole thing strict is better in production so nothing slips out unvalidated

export default registerSchema

