import { z } from "zod"
import usernameSchema from "../common/username.schema.js"
import fullNameSchema from "../common/fullName.schema.js"

const updateUserDetailsSchema = z.object({
    body: z.object({
        username: usernameSchema.optional(),
        fullName: fullNameSchema.optional(),
    }).strict(),
    query: z.object({}).optional(),
    params: z.object({}).optional(),
}).strict()

export default updateUserDetailsSchema