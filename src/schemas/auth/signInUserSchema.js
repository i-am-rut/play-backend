import { z } from "zod"
import emailSchema from "../common/email.schema.js"
import usernameSchema from "../common/username.schema.js"
import passwordSchema from "../common/password.schema.js"

const signInSchema = z.object({
    body: z.object({
        identifier: z
            .string()
            .trim()
            .min(1, "Email or username is required")
            .superRefine((value, ctx) => {
                const isEmail = emailSchema.safeParse(value).success
                const isUsername = usernameSchema.safeParse(value).success

                if (!isEmail && !isUsername) {
                    ctx.addIssue({
                        message: "Must be a valid email or username",
                    })
                }
            }),

        password: passwordSchema
    }).strict(), 

    query: z.object({}).optional(), 
    params: z.object({}).optional()
}).strict() 

export default signInSchema

