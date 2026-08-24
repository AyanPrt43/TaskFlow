import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";


// Defining the Schema
const userSchema = new Schema(
    {
        avatar: {
            type: {
                url: String,
                lacalPath: String
            },
            default: {
                url: "https://placehold.co/200x200",
                localPath: ""
            }
        },

        username: {
            type: String,
            require: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true
        },
        
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true
        },

        fullanem: {
            type: String,
            trim: true
        },

        password: {
            type: String,
            required: [true, "Password is required"]
        },

        isEmailVerified: {
            type: Boolean,
            default: false
        },

        refreshToken: {
            type: String
        },

        forgotPasswordToken: {
            type: String
        },

        forgotPasswordExpiry: {
            type: Date
        },

        emailVerificationToken: {
            type: String
        },

        emailVerificationExpiry: {
            type: Date
        }
    },

    {
        timestamps: true
    }
)

// Defining PreHooks for encrypting the given password or for converting the String Password into an Encrypted form 
userSchema.pre("save", async function(){
    if(!this.isModified("password")) return; //It will triggered if the password is not modified and which will skip the rest of the code block//

    this.password = await bcrypt.hash(this.password, 10)
})


// Comparing the password given by the user that whether the password is correct or not
userSchema.methods.isPasswordCorrect = async function(password){
    return bcrypt.compare(password, this.password);
};

// Generating Access Token
userSchema.methods.generateAccessToken = function (){
    return   jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username
        },
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: process.env.ACCESS_TOKEN_EXPIRY}
    )
}

// Generating Refresh Token
userSchema.methods.generateRefreshToken = function (){
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {expiresIn: process.env.REFRESH_TOKEN_EXPIRY}
    )
}

// Generating Temprary Tokens
userSchema.methods.generateTempraryToken = function (){
    const unHashedToken = crypto.randomBytes(20).toString("hex")

    const hashedToken = crypto
        .createHash("sha256")
        .update(unHashedToken)
        .digest("hex")

    const tokenExpiry = Date.now() + (20*60*1000) //20 minutes

    return{unHashedToken, hashedToken, tokenExpiry}
}

export const User = mongoose.model("User", userSchema);