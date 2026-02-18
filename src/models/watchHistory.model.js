import { Schema, model } from "mongoose";

const watchHistorySchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User ref is required"],
    },
    video: {
        type: Schema.Types.ObjectId,
        ref: "Video",
        required: [true, "Video ref is required"]
    },
    watchedAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true })

watchHistorySchema.index({ user: 1 })
watchHistorySchema.index({ video: 1 })

// prevention of duplicate user-video pairs
watchHistorySchema.index({ user: 1, video: 1 }, { unique: true });

export const WatchHistory = model('WatchHistory', watchHistorySchema) 