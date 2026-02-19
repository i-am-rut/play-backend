import { Schema, model } from "mongoose";

const tweetReplySchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User ref is required"],
    },
    tweet: {
        type: Schema.Types.ObjectId,
        ref: "Tweet",
        required: [true, "Tweet ref is required"],
    },
    content: {
        type: String,
        required: [true, "Tweet reply content is required"],
        minlength: [1, "Tweet reply should be atleast 1 character."],
        maxlength: [2000, "Tweet reply should be no more than 2000 characters."],
        trim: true,
    },
    parentReply: {
        type: Schema.Types.ObjectId,
        ref: "TweetReply",
        default: null,
    },
    voteCount: {
        type: Number,
        default: 0
    }
}, { timestamps: true })

tweetReplySchema.index({ tweet: 1, createdAt: -1 }) // fetch all replies for a tweet
tweetReplySchema.index({ owner: 1 })  // fetch user’s replies

tweetReplySchema.pre("validate", async function (next) {
    if (!this.tweet && this.parentReply) {
        const parent = await this.constructor.findById(this.parentReply);
        if (!parent) return next(new Error("Parent reply not found"))
        this.tweet = parent.tweet
    }
    // prevent self-referencing
    if (this.parentReply && this.parentReply.equals(this._id)) {
        return next(new Error("parentReply cannot reference itself."))
    }
    next()
})

export const TweetReply = model("TweetReply", tweetReplySchema)