import { z } from "zod"
import userRequirements from "../../utils/SchemaUtils/user/index.js"

const fullNameSchema = z
    .string()
    .min(userRequirements.fullName.min, `Full name must be at least ${userRequirements.fullName.min} characters`)
    .max(userRequirements.fullName.max, `Full name must be no more than ${userRequirements.fullName.max} characters`)
    .trim()
    .regex(
        /^[A-Za-z]+(?: [A-Za-z]+)*$/,
        "Full name must contain only letters and spaces between words"
    )

export default fullNameSchema