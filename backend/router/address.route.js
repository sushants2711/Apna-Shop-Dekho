import express from "express";
import { verifyCookiesForUser } from "../middleware/verify.cookies.js";
import { addAddressMiddleware } from "../middleware/address.middleware.js";
import { addressByIdData, deleteAddressController, getAllAddressController, postAddressController, updateAddressController } from "../controller/address.controller.js";

const addressRouter = express.Router();

addressRouter.route("/add").post(verifyCookiesForUser, addAddressMiddleware, postAddressController);
addressRouter.route("/").get(verifyCookiesForUser, getAllAddressController);
addressRouter.route("/delete/:id").delete(verifyCookiesForUser, deleteAddressController);
addressRouter.route("/update/:id").put(verifyCookiesForUser, updateAddressController);
addressRouter.route("/:id").get(verifyCookiesForUser, addressByIdData);

export default addressRouter;