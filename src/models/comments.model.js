import { Schema, model } from "mongoose";

const commentSchema = new Schema({
    content: {
        type: String,
        required: [true, "Comment content is required"],
        minlength: [1, "Comment should be atleast 1 character."],
        maxlength: [2000, "Comment should be no more than 2000 characters."],
        trim: true,
    },
    video: {
        type: Schema.Types.ObjectId,
        ref: "Video",
        required: [true, "Video ref is required."],
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User ref is required"]
    },
    parentComment: {
        type: Schema.Types.ObjectId,
        ref: "Comment",
        default: null
    },
    voteCount: {
        type: Number,
        default: 0
    }
}, { timestamps: true })

commentSchema.index({ video: 1, createdAt: -1 })
commentSchema.index({ video: 1, voteCount: -1 })
commentSchema.index({ owner: 1 })

commentSchema.pre("validate", async function (next) {
    if (!this.video && this.parentComment) {
        const parent = await this.constructor.findById(this.parentComment);
        if (!parent) return next(new Error("Parent comment not found"));
        this.video = parent.video
    }
    next()
})


export const Comment = model("Comment", commentSchema)
