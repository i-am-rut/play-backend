import { Point } from "../models/points.model.js"
import { User } from "../models/user.model.js"
import ApiError from "../utils/ApiUtils/ApiError.js"
import { ApiResponse } from "../utils/ApiUtils/ApiResponse.js"

const firePoint = async (req, res) => {
    const { _id } = req.user
    if (!_id) {
        throw new ApiError(401, "Unauthorized request")
    }
    const { content } = req.body
    if (!content) {
        throw new ApiError(400, "point content is required.")
    }

    const point = await Point.create({
        content,
        owner: _id
    })

    return res.status(201).json(new ApiResponse(200, "point fired successfully", point))

}

const editPoint = async (req, res) => {
    const { content } = req.body
    const { _id } = req.params
    if (!content) {
        throw new ApiError(400, "point content is required.")
    }

    const updatedPoint = await Point.findByIdAndUpdate(_id, {
        $set: {
            content,
            isEdited: true
        }
    }, {
        new: true,
        runValidators: true,
        context: "query"
    }).select("-updatedAt")

    if (!updatedPoint) {
        throw new ApiError(404, "Point not found");
    }

    return res.status(200).json(new ApiResponse(200, "Point updated successfully!", updatedPoint))
}

// const getUserPoints = async (req, res) => {
//     const { _id } = req.params
//     if (!_id) {
//         throw new ApiError(400, "Invalid request parameters")
//     }
//     const user = await User.findById(_id)
//     if (user) {
//         const userPoints = await Point.find({
//             owner: _id
//         }).sort({ createdAt: -1 }).select("-updatedAt -__v")

//         if (!userPoints) {
//             throw new ApiError(400, "Invalid request")
//         }

//         res.status(200).json(new ApiResponse(200, "User points fetched successfully!", userPoints))
//     } else {
//         throw new ApiError(404, "User does not exist")
//     }


// }


export {
    firePoint,
    editPoint,
    // getUserPoints
}