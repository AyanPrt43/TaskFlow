import { body } from "express-validator";

const userRegisterValidator = () => {
    return[
        body("email")
        .trim()
        .notEmpty().withMessage("Email cannot be empty!")
        .isEmail().withMessage("Email is invalid"),

        body("username")
        .trim()
        .toLowerCase()
        .notEmpty().withMessage("Username cannot be empty!")
        .isLowercase().withMessage("Username must be in lower case")
        .isLength({min:5}).withMessage("Length of username should bw atleast 5 characters"),

        body("fullname")
        .optional()
        .trim(),

        body("password")
        .trim()
        .notEmpty().withMessage("Password cannot be empty")
    ];
};


const userLoginValidator = () => {
    return [
        body("email")
        .optional()
        .isEmail().withMessage("Invalid Email"),

        body("password")
        .notEmpty()
        .withMessage("Password is Required")
        
    ]
};


const ForgotPasswordRequestValidator = () => {
    return [
        body("email")
        .isEmail().withMessage("Invalid Email")
        .notEmpty().withMessage("Email is Required")
    ]
};

const ForgotPasswordResetValidator = () => {
    return [
        body("NewPassword")
        .notEmpty().withMessage("New Password is required!")
    ]
};

const ChangeCurrentPasswordValidator = () => {
    return [
        body("OldPassword")
        .notEmpty().withMessage("Old Password is required"),

        body("NewPassword")
        .notEmpty().withMessage("New Password is Required")
    ]
};

export { userRegisterValidator, userLoginValidator, ForgotPasswordRequestValidator, ForgotPasswordResetValidator, ChangeCurrentPasswordValidator };