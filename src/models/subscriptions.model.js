import { Schema, model } from "mongoose"

const subscriptionSchema = new Schema({
    subscriber: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true,
    },
    channel: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true,
    },
}, { timestamps: true })

subscriptionSchema.index({ subscriber: 1 });
subscriptionSchema.index({ channel: 1 });
subscriptionSchema.index({ subscriber: 1, channel: 1 }, { unique: true })

// Self-subscribe prevention
subscriptionSchema.pre("save", async function (next) {
    if (this.subscriber.equals(this.channel)) {
        return next(new Error("User can not subscribe to themselves."))
    }
    next()
})

export const Subscription = model("Subscription", subscriptionSchema)