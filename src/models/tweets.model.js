import { Schema, model } from "mongoose";

const tweetSchema = new Schema({
    content: {
        type: String,
        required: [true, "Content is required"],
        minlength: [1, "Content should be atleast 1 character"],
        maxlength: [576, "Content should be no more than 576 characters"],
        trim: true,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User ref is required"],
    },
    voteCount: {
        type: Number,
        default: 0
    }
}, { timestamps: true })

tweetSchema.index({ owner: 1 });
tweetSchema.index({ createdAt: -1 });
tweetSchema.index({ voteCount: -1 });


export const Tweet = model("Tweet", tweetSchema)