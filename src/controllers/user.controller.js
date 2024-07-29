import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { uploadOnCloudinary } from '../utils/cloudinary.js'
 
import { User } from '../models/user.model.js'

const registerUser = asyncHandler(async (req, res) => {
    // get user details fromm front end here with postman
    // validation if something is empty - email in format?
    // check if user already exists: check username or email 
    // check for images: check for avatar
    // upload to cloudinary - url save in db, check avatar
    // create user object - create entry in DB calls.
    // remove password and refresh token field
    // check for user creation - null response?
    // return response

    const { fullName, username, email, password } = req.body
    console.log("Email: ", email);

    if (
        [fullName, email, password, username].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All Fields are required.")
    }

    const existedUser = User.findOne({
        $or: [{ username }, { email }]
    })

    if (existedUser) {
        throw new ApiError(409, "User with email or username already exists.")
    }

    const avatarLocalPath = req.files?.avatar[0]?.path
    const coverImageLocalPath = req.files?.coverImage[0]?.path

    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is required.")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath)


    let coverImage;
    if (!coverImageLocalPath) {
        coverImage =  await uploadOnCloudinary(coverImageLocalPath)
    }

    const user = User.create({
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        fullName: fullName,
        username: username.toLowerCase(),
        password: password,
        email: email
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user.")
    }
 
    return res.status(200).json(new ApiResponse(
        200, createdUser, "User registered successfully."
    ))


})

export { registerUser }