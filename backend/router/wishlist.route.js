import express from "express";
import { allWishlistController, deleteWishlistController, toggleWishlistController } from "../controller/wishlist.controller.js";
import { verifyCookiesForUser } from "../middleware/verify.cookies.js";

const wishlistRouter = express.Router();

wishlistRouter.route("/:id").post(verifyCookiesForUser, toggleWishlistController);
wishlistRouter.route("/").get(verifyCookiesForUser, allWishlistController);
wishlistRouter.route("/delete/:id").delete(verifyCookiesForUser, deleteWishlistController);

export default wishlistRouter;