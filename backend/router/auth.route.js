import express from "express";
import { loginMiddleware, signupMiddleware, updateUserProfileMiddleware } from "../middleware/auth.middleware.js";
import { deleteController, getUserProfileData, loginController, logoutController, signupController, updateUserProfileData } from "../controller/auth.controller.js";
import { verifyCookiesForUser } from "../middleware/verify.cookies.js";

const authRouter = express.Router();

authRouter.route("/signup").post(signupMiddleware, signupController);
authRouter.route("/login").post(loginMiddleware, loginController);
authRouter.route("/logout").post(verifyCookiesForUser, logoutController);
authRouter.route("/account/delete").delete(verifyCookiesForUser, deleteController);

authRouter.route("/get-user").get(verifyCookiesForUser, getUserProfileData);
authRouter.route("/update-user").put(verifyCookiesForUser, updateUserProfileMiddleware, updateUserProfileData);

export default authRouter;