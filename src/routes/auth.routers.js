import { Router } from "express";
import { RegisterUser, login, logout, verifyEmail, RefreshAccessToken, ForgotPasswordRequest, ForgotPasswordReset, ChangeCurrentPassword, getCurrentUser, ResendVerificationEmail  } from "../controllers/auth-controller.js";
import { validate } from "../middlewares/validators.middleware.js"
import { userRegisterValidator, userLoginValidator, ForgotPasswordRequestValidator, ForgotPasswordResetValidator, ChangeCurrentPasswordValidator } from "../validators/index.js"
import { verifyJWT } from "../middlewares/auth.middleware.js"


const router = Router();


// UnSecure Routes: It means that the routes inside the UnSecure Routes are those routes which deals with when the user is not logged in // 
router.route("/register").post(userRegisterValidator(), validate, RegisterUser);

router.route("/login").post(userLoginValidator(),validate, login);

router.route("/verify-email/:VerificationToken").get(verifyEmail);

router.route("/refresh-token").post(RefreshAccessToken);

router.route("/forgot-password-request").post(ForgotPasswordRequestValidator(), validate, ForgotPasswordRequest);

router.route("/Forgot-password-reset/:ResetToken").post(ForgotPasswordResetValidator(), validate, ForgotPasswordReset);


// Secure Routes: It means that the routes inside the Secure Routes are those routes which deals with iff the user is logged in //
router.route("/logout").post(verifyJWT, logout);

router.route("/current-user").post(verifyJWT, getCurrentUser);

router.route("/change-current-password").post(verifyJWT, ChangeCurrentPasswordValidator(), validate, ChangeCurrentPassword);

router.route("/resend-verification-email").post(verifyJWT, ResendVerificationEmail);



export default router;