import express from "express";
import { addProductController, allUniqueBrandController, allUniqueCategoriesController, bestSellerController, deleteProductByIdController, getAllBrandProduct, getAllCategoriesProduct, getAllProductController, productByIdController } from "../controller/product.controller.js";
import { verifyCookiesForAdmin } from "../middleware/verify.cookies.admin.js";
import { addProductMiddleware } from "../middleware/product.middleware.js";
import { upload } from "../middleware/multer.middleware.js";

const productRouter = express.Router();

productRouter.route("/add").post(verifyCookiesForAdmin, upload.array("images", 7), addProductMiddleware , addProductController);
productRouter.route("/").get(getAllProductController);
productRouter.route("/category").get(allUniqueCategoriesController);
productRouter.route("/brand").get(allUniqueBrandController);
productRouter.route("/category/:category").get(getAllCategoriesProduct);
productRouter.route("/brand/:brand").get(getAllBrandProduct);
productRouter.route("/bestseller").get(bestSellerController);
productRouter.route("/:id").get(productByIdController);
productRouter.route("/delete/:id").delete(verifyCookiesForAdmin, deleteProductByIdController);

export default productRouter;