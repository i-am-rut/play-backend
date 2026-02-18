import { Schema, model } from "mongoose";

const playlistSchema = new Schema({
    name: {
        type: String,
        required: [true, "Playlist name is required"],
        minlength: [1, "Playlist name must be at least 1 character"],
        maxlength: [100, "Playlist name should be no more than 100 characters"],
        trim: true,
    },
    description: {
        type: String,
        required: [true, "Playlist description is required"],
        minlength: [2, "Playlist description must be at least 2 character"],
        maxlength: [200, "Playlist description should be no more than 200 characters"],
        trim: true,
    },
    videos: [
        {
            type: Schema.Types.ObjectId,
            ref: "Video",
        }
    ],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User ref is required"]
    },
    voteCount: {
        type: Number,
        default: 0
    }
}, { timestamps: true })

playlistSchema.index({ owner: 1 });
playlistSchema.index({ name: "text", description: "text" });

export const Playlist = model("Playlist", playlistSchema)