import express from "express";
import { verifyCookiesForUser } from "../middleware/verify.cookies.js";
import { getAllCartItemsPayment, getKey, paymentVerification, processPayment } from "../controller/payment.controller.js";
import { createPayment, getAllPaymentHistory } from "../controller/payment.controller.js";

const paymentRouter = express.Router();
paymentRouter.route("/add/:productId/:amount/:size/:addressId").post(verifyCookiesForUser, createPayment);

paymentRouter.route("/").get(verifyCookiesForUser, getAllPaymentHistory);

paymentRouter.route("/add/:addressId").post(verifyCookiesForUser, getAllCartItemsPayment);



// razorpay integration

paymentRouter.route("/process").post(verifyCookiesForUser, processPayment);
paymentRouter.route("/getkey").get(verifyCookiesForUser, getKey);
paymentRouter.route("/paymentVerification").post(verifyCookiesForUser, paymentVerification);

export default paymentRouter;