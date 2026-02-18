import { Schema, model } from "mongoose";

const userInteractionSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User ref is required"]
    },
    targetId: {
        type: Schema.Types.ObjectId,
        required: [true, "TargetId is required"]
    },
    targetType: {
        type: String,
        enum: ["Video", "Comment", "Tweet", "TweetReply", "Playlist"],
        required: [true, "Target type is required"]
    },
    value: {
        type: Number,
        enum: [1, -1],
        required: [true, "Value is required"]
    }
}, { timestamps: true })

userInteractionSchema.index({ owner: 1, targetId: 1 }, { unique: true })

userInteractionSchema.index({ targetId: 1 })

export const UserInteraction = model("UserInteraction", userInteractionSchema)