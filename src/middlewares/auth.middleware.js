import { User } from "../models/users.models.js";
import { ApiError } from "../utils/api-error.js";
import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/async-handler.js";

const verifyJWT = asyncHandler(async (req, res, next) => {
    const token = req.cookies?.AccessToken || req.header("Authorization")?.replace("Bearer ", "");

    if(!token){
        throw new ApiError(401, "unauthorized User Request");
    }else{
        try{
            const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

            const user = await User.findById(decodedToken?._id).select
            (
                "-password -refreshToken -emailVerificationToken -emailVerificationExpiry",
            );
            if(!user){
                throw new ApiError(401, "Invalid Access Token");
            }
            req.user = user
            next()
        }catch (error){
                throw new ApiError(401, "Invalid Access Token");
        }
    }
})

export { verifyJWT }