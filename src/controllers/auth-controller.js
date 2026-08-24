import { User } from "../models/users.models.js";
import { ApiResponse } from "../utils/api-response.js";
import { ApiError } from "../utils/api-error.js";
import { asyncHandler } from "../utils/async-handler.js";
import { SendEmail,  emailverification } from "../utils/mail.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { validationResult } from "express-validator";


const GenerateAccessTokenandRefreshToken = async (userID) => {
    try{
        const NewUser = await User.findById(userID);
        const AccessToken = NewUser.generateAccessToken();
        const RefreshToken = NewUser.generateRefreshToken();

        NewUser.refreshToken = RefreshToken
        await NewUser.save({validateBeforeSave: false})
        return {AccessToken, RefreshToken}
    }catch(error){
        throw new ApiError(500, "Something went wrong while generating access token")
    }
}

const RegisterUser = asyncHandler(async(req, res) => {
    const {email, username, password, role} = req.body

    const ExistedUser = await User.findOne({
        $or: [{username}, {email}]
    })


    if(ExistedUser){
        throw new ApiError(409, "User with email or username already exists", [])
    }


    const NewUser = await User.create({
        email,
        username,
        password,
        isEmailVerified: false
    })

    const { unHashedToken, hashedToken, tokenExpiry } = NewUser.generateTempraryToken()

    // saving the Tokens into the DataBase //
    NewUser.emailVerificationToken = hashedToken
    NewUser.emailVerificationExpiry = tokenExpiry

    await NewUser.save({validateBeforeSave: false})

    await SendEmail({
        email: NewUser?.email,
        subject: "Please Verify your email",
        mailgenContent: emailverification(
            NewUser.username, 
            `${req.protocol}://${req.get("host")}/api/v1/users/verify-email/${unHashedToken}`,
        ),
    });

    // User ko database se dobara fetch karo, sensitive fields hatao, check karo user mila ya nahi, aur safe user data response mein bhejo
    const createdUser = await User.findById(NewUser._id).select(
        "-password -refreshToken -emailVerificationToken -emailVerificationExpiry",
    );

    if(!createdUser){
        throw new ApiError(500, "Something went wrong while registring the user")
    }

    return res.status(201).json(
        new ApiResponse(
            200,
            {NewUser: createdUser},
            "User registered successfully and verification email has been sent to your email"
        )
    )
});

const login = asyncHandler(async (req, res) => {
// Taking Data From the User//
    const {email, password, username} = req.body

    // Checking if the email is valid if it is valid we find the user using that email//
    if(!email){
        throw new ApiError(400, "Email is required!")
    }else{
        const user = await User.findOne({email})
        // Checking if the user exixts or not//
        if(!user){
            throw new ApiError("User not found!");
        }
        // If user exists then checking is the password is correct or not//
        else{
            const ValidatePassword = await user.isPasswordCorrect(password);

            if(!ValidatePassword){
                throw new ApiError(400, "Invalid Password!");
            }
            // If the password is correct then we will generate the tokens i.e., accessTokens and refreshTokens//
            else{
                const {AccessToken, RefreshToken} = await GenerateAccessTokenandRefreshToken(user._id);

                // Send tokens in cookies
                const LoggedInUser = await User.findById(user._id).select(
                    "-password -refreshToken -emailVerificationToken -emailVerificationExpiry",
                );

                // Yaha ham browser safety configure kr rhe h //
                // httpOnly: true --> Ye browser ko bolta hai: Is cookie ko client-side JavaScript se directly access mat karne dena 
                // or 
                // secure: true --> Ye browser ko bolta hai: Is cookie ko secure HTTPS connection par hi send karna.
                const options = {
                    httpOnly: true,
                    secure: true
                }

                return res.
                        status(200)
                        .cookie("AccessToken", AccessToken, options)
                        .cookie("RefreshToken", RefreshToken, options)
                        .json(
                             new ApiResponse(
                                200,
                                {
                                    user: LoggedInUser,
                                    RefreshToken,
                                    AccessToken
                                },
                                "User Logged In Successfully"
                            )
                        )
            }
        }
    }
});

const logout = asyncHandler(async(req, res) => {
    await User.findByIdAndUpdate(req.user._id,
        {
            $set: {
                refreshToken: ""
            }
        },
        {
            new: true
        }
    );
    const options = {
        httpOnly: true,
        secure: true
    }
    return res.status(200).clearCookie("AccessToken", options).clearCookie("RefreshToken", options).json(
        new ApiResponse(200, {}, "User logged out")
    )
});

const getCurrentUser = asyncHandler(async (req, res) => {
    return res
        .status(200).json(
            new ApiResponse(
                200,
                req.user,
                "Current User fetched Successfully"
            )
        )
});

const verifyEmail = asyncHandler(async (req, res) => {
    // Extract the EmailVerificationURL (unHashedToken) linked inside the email button //
    const {VerificationToken} = req.params;

    if(!VerificationToken){
        throw new ApiError(400, "Email verification token is missing")
    }

    // Converting the unHashedToken into HashedToken //

    let HashedToken = crypto.createHash("sha256").update(VerificationToken).digest("hex")

    // Finding the user by comparing these-
    // emailVerificationToken which is stored in DB in form of HashedToken with the newly converted unHashedToken to HashedToken and,
    // emailVerificationExpiry which is stored in DB by comparing the time stored in DB and the current time and if the current time is smaller than the times stored in DB then the token is Valid otherwise not //
    const user = await User.findOne({
        emailVerificationToken: HashedToken,
        emailVerificationExpiry: { $gt: Date.now()}
    })

    // If User not found then throw error //
    if(!user){
        throw new ApiError(400, "Token is Invalid or Expired")
    }

    // If the user is found then verifit the email of the user as verified and save changes into DataBase //
    user.isEmailVerified = true
    await user.save({validateBeforeSave: false});

    // Afte making changes ensure to remove the emailVerificationToken and emailVerificationExpiry form the DataBase for security purposes //
    user.emailVerificationToken = undefined
    user.emailVerificationExpiry = undefined

    res.status(200).json(
        new ApiResponse(
            200,
            {
                isEmailVerified: true
            },
            "Email is Verified"
        )
    );


});

const ResendVerificationEmail = asyncHandler(async (req, res) => {
    // We can only resend the Email verification mail if and only if the user is already loggedIn //

    // Since the user is already loggedin so we can fetch the user using (req.user?._id)
    const user = await User.findById(req.user?._id);

    // Is user not found //
    if (!user){
        throw new ApiError (404, "User not found!")
    }

    // If the user is already verified //
    if(user.isEmailVerified){
        throw new ApiError(409, "User is alreasdy verified!")
    }

    // Resend verification Email
    const { unHashedToken, hashedToken, tokenExpiry } = NewUser.generateTempraryToken()

    // saving the Tokens into the DataBase //
    NewUser.emailVerificationToken = hashedToken
    NewUser.emailVerificationExpiry = tokenExpiry

    await NewUser.save({validateBeforeSave: false})

    await SendEmail({
        email: NewUser?.email,
        subject: "Please Verify your email",
        mailgenContent: emailverification(
            NewUser.username, 
            `${req.protocol}://${req.get("host")}/api/v1/users/verify-email/${unHashedToken}`,
        )
    });

    return res.status(200).json(
        new ApiResponse(200, {}, "Mail has been sent to yout Email-ID")
    );
});

const RefreshAccessToken = asyncHandler(async(req, res) => {
    const OldRefreshToken = req.cookies.refreshToken || req.body.refreshToken

    if(!OldRefreshToken){
        throw new ApiError(401, "Unthorized Access")
    }

    try
    {   
        const verify = jwt.verify(OldRefreshToken, process.env.REFRESH_TOKEN_SECRET)
        
        const user = User.findById(verify?._id)

        if(!user){
            throw new ApiError(401, "Invalid refresh token")
        }

        if(user?.refreshToken !== OldRefreshToken){
            throw new ApiError(401,"Refresh token is expired")
        }

        const options = {
            httpOnly: true,
            secure: true
        }

        const {AccessToken, RefreshToken: NewRefreshToken} = await GenerateAccessTokenandRefreshToken(user._id)
        user.refreshToken = NewRefreshToken
        await user.save()


        return res.status(200)
        .cookie("refreshToken", NewRefreshToken, options)
        .cookie("accessToken", AccessToken, options)
        .json(
            new ApiResponse(
                200,
                {AccessToken, RefreshToken: NewRefreshToken},
                "User's Refresh Token in refreshed successfully"
            )
        )

    }catch(error){
        throw new ApiError(401, "Invalid Refresh Token")
    }
});

const ForgotPasswordRequest = asyncHandler(async(req, res) => {
    // Take email of the user from the web body where user enters it's email to reset the password //
    const {email} = req.body

    // Now, search for the use with associated email in the DataBase //
    const user = User.findOne({email})

    // If user not found then //
    if(!user){
        throw new ApiError(404, "User not found!")
    }

    // If user is found then reallot the tempraty tokens //
    const {unHashedToken, hashedToken, tokenExpiry} = user.generateTempraryToken()

    // Save the progress in the DataBase //
    user.ForgotPasswordToken = unHashedToken
    user.ForgotPasswordExpiry = tokenExpiry
    await user.save({validateBeforeSave: false})

    // Now send the email to user for reset their password //
    SendEmail({
        email: user?.email,
        subject: "Password reset request",
        mailgenContent: resetpassword(
            user?.username,
            `${process.env.FORGOT_PASSWORD_REDIRECT_URL}/${hashedToken}`
        ),
    });

    res.status(200).json(
        new ApiResponse(
            200,
            {},
            "Password reset email sent successfully"
        )
    )
});

const ForgotPasswordReset = asyncHandler(async(req, res) => {
    const {ResetToken} = req.params
    const {NewPassword} = req.body

    let HashedToken = crypto.createHash("sha256").update(ResetToken).digest("hex")

    const user = User.findOne({
        forgotPasswordToken: HashedToken,
        forgotPasswordExpiry: { $gt: Date.now()}
    })

    if(!user){
        throw new ApiError(401, "Token is invalid or expired")
    }

    forgotPasswordToken = undefined
    forgotPasswordExpiry = undefined

    user.password = NewPassword
    await user.save({validateBeforeSave: false})

    return res.status(200).json(
        new ApiResponse(
            200,
            {},
            "User's password reset successful"
        )
    );

});

const ChangeCurrentPassword = asyncHandler(async(req, res) => {
    const {OldPassword, NewPassword} = req.body

    // Since the user is already loggedin so we can find the user using (user?._id)
    const user = User.findById(user?._id)

    if(!user){
        throw new ApiError(404, "User not found!")
    }

    // If user is found then we have to verify if the password is correct or not using isPasswordCorrect //
    const VerifyPassword = isPasswordCorrect(OldPassword)

    if(!VerifyPassword){
        throw new ApiError(402, "Invalid Password!")
    }

    // If the password is comapared and found to be correct then we will update the password in the DB with the new password //
    user.password = NewPassword

    // Once the password is updated we will save changes in the DataBase //
    user.save({validateBeforeSave: false})

    // Now, once the password is resetted successfully we will send a successfull response to the client //

    return res.status(200).json(
        new ApiResponse(
            200,
            {},
            "Password changed successfully"
        )
    )
    

});
export{ RegisterUser, login, logout, getCurrentUser, verifyEmail, ResendVerificationEmail, RefreshAccessToken, ForgotPasswordRequest, ForgotPasswordReset, ChangeCurrentPassword  };