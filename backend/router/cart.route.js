import express from "express";
import { verifyCookiesForUser } from "../middleware/verify.cookies.js";
import { addCartItems, cartDecreaseBy1, cartIncreaseBy1, deleteCartItems, getAllCartItems, removeAllCartItems } from "../controller/cart.controller.js";

const cartRouter = express.Router();

cartRouter.route("/add/:id").post(verifyCookiesForUser, addCartItems);
cartRouter.route("/").get(verifyCookiesForUser, getAllCartItems);
cartRouter.route("/delete/:id").delete(verifyCookiesForUser, deleteCartItems);
cartRouter.route("/update/increase/:id").put(verifyCookiesForUser, cartIncreaseBy1);
cartRouter.route("/update/decrease/:id").put(verifyCookiesForUser, cartDecreaseBy1);
cartRouter.route("/remove/all-cart").delete(verifyCookiesForUser, removeAllCartItems);

export default cartRouter;