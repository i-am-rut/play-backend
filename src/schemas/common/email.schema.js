import { z } from "zod"

const emailSchema = z
    .email("Invalid email format")
    .toLowerCase()
    .trim()

export default emailSchema