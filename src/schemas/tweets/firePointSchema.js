import { z } from "zod"
import pointRequirements from "../../utils/SchemaUtils/points.js"

const firePointSchema = z.object({
    body: z.object({
        content: z
        .string()
        .trim()
        .min(pointRequirements.content.min, `Point should be atleast ${pointRequirements.content.min} character`)
        .max(pointRequirements.content.max, `Point should be no more than ${pointRequirements.content.max} characters`)
    }).strict(),
    query: z.object({}).optional(),
    params: z.object({}).optional()
}).strict()

export default firePointSchema