import { Schema, model } from "mongoose";

const pointReplySchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User ref is required"],
    },
    point: {
        type: Schema.Types.ObjectId,
        ref: "Point",
        required: [true, "Point ref is required"],
    },
    content: {
        type: String,
        required: [true, "Point reply content is required"],
        minlength: [1, "Point reply should be atleast 1 character."],
        maxlength: [2000, "Point reply should be no more than 2000 characters."],
        trim: true,
    },
    parentReply: {
        type: Schema.Types.ObjectId,
        ref: "PointReply",
        default: null,
    },
    voteCount: {
        type: Number,
        default: 0
    }
}, { timestamps: true })

pointReplySchema.index({ point: 1, createdAt: -1 }) // fetch all replies for a point
pointReplySchema.index({ owner: 1 })  // fetch user’s replies

pointReplySchema.pre("validate", async function (next) {
    if (!this.point && this.parentReply) {
        const parent = await this.constructor.findById(this.parentReply);
        if (!parent) return next(new Error("Parent reply not found"))
        this.point = parent.point
    }
    // prevent self-referencing
    if (this.parentReply && this.parentReply.equals(this._id)) {
        return next(new Error("parentReply cannot reference itself."))
    }
    next()
})

export const PointReply = model("PointReply", pointReplySchema)