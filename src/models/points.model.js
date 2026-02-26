import { Schema, model } from "mongoose";
import pointRequirements from "../utils/SchemaUtils/points.js";

const pointSchema = new Schema({
    content: {
        type: String,
        required: [true, "Content is required"],
        minlength: [pointRequirements.content.min, `Content should be atleast ${pointRequirements.content.min} character`],
        maxlength: [pointRequirements.content.max, `Content should be no more than ${pointRequirements.content.max} characters`],
        trim: true,
    },
    images: [
        {
            type: String
        }
    ],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User ref is required"],
    },
    isEdited: {
        type: Boolean,
        default: false,
    },
    voteCount: {
        type: Number,
        default: pointRequirements.voteCount.default,
    }
}, { timestamps: true })

pointSchema.index({ owner: 1 })
pointSchema.index({ createdAt: -1 })
pointSchema.index({ voteCount: -1 })


export const Point = model("Point", pointSchema)