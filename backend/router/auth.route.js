import express from "express";
import { loginMiddleware, signupMiddleware } from "../middleware/auth.middleware.js";
import { deleteController, loginController, logoutController, signupController } from "../controller/auth.controller.js";
import { verifyCookiesForUser } from "../middleware/verify.cookies.js";

const authRouter = express.Router();

authRouter.route("/signup").post(signupMiddleware, signupController);
authRouter.route("/login").post(loginMiddleware, loginController);
authRouter.route("/logout").post(verifyCookiesForUser, logoutController);
authRouter.route("/account/delete").delete(verifyCookiesForUser, deleteController);

export default authRouter;