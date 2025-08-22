import express from "express";
import { verifyCookiesForUser } from "../middleware/verify.cookies.js";
import { createPayment, getAllPaymentHistory } from "../controller/payment.controller.js";

const paymentRouter = express.Router();

paymentRouter.route("/add/:addressId/:productId").post(verifyCookiesForUser,  createPayment);
paymentRouter.route("/").get(verifyCookiesForUser, getAllPaymentHistory);

export default paymentRouter;