import { z } from "zod"
import pointRequirements from "../../utils/SchemaUtils/points.js"

const editPointSchema = z.object({
    body: z.object({
        content: z
        .string()
        .trim()
        .min(pointRequirements.content.min, `Point should be atleast ${pointRequirements.content.min} character`)
        .max(pointRequirements.content.max, `Point should be no more than ${pointRequirements.content.max} characters`)
    }).strict(),
    query: z.object({}).optional(),
    params: z.object({
        _id: z
        .string()
        .trim()
        .min(1, "Point id can not be empty string")
        .max(24, "Point id can not be more than 24 characters long")
        .regex(/^[a-fA-F0-9]{24}$/, "Invalid Id format")
    }).strict()
}).strict()

export default editPointSchema