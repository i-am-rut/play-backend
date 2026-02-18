import { model, Schema } from "mongoose";

const videoSchema = new Schema({
    videoFileUrl: {
        type: String,
        required: [true, "Video URL is required"],
    },
    thumbnail: {
        type: String,
        required: [true, "Thumbnail is required"],
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    title: {
        type: String,
        required: [true, "Title is required"],
        trim: true,
        maxlength: [200, "Title should be no more than 200 characters"],
        minlength: [1, "Title should be atleast  1 character."],
    },
    description: {
        type: String,
        required: [true, "Description is required"],
        trim: true,
        maxlength: [2000, "Description should be no more than 2000 characters"],
        minlength: [1, "Description should be atleast  1 character."]
    },
    duration: {
        type: Number,
        default: 0,
        min: [0, "Duration can not be negative"]
    },
    views: {
        type: Number,
        default: 0,
        min: [0, "Views can not be negative"]
    },
    isPublished: {
        type: Boolean,
        default: false
    },
    voteCount: {
        type: Number,
        default: 0
    }
}, { timestamps: true })

videoSchema.index({ owner: 1 })
videoSchema.index({ title: "text", description: "text" })

export const Video = model("Video", videoSchema)