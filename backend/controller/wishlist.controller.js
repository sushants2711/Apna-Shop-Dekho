import mongoose from "mongoose";
import wishlistModel from "../models/wishlist.model.js";
import productModel from "../models/product.model.js";


export const toggleWishlistController = async (req, res) => {
    try {
        const { id } = req.params;

        const loggedInUser = req.user._id;

        // console.log(loggedInUser, id)

        if (!id) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Id is missing"
                });
        };

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Invalid mongoDb Id format"
                });
        };

        if (!loggedInUser) {
            return res
                .status(403)
                .json({
                    success: false,
                    message: "Unauthorized - User"
                });
        };

        if (!mongoose.Types.ObjectId.isValid(loggedInUser)) {
            return res
                .status(403)
                .json({
                    success: false,
                    message: "Inavlid Id and Unauthorized -user"
                });
        };

        const productExist = await productModel.findById(id);

        if (!productExist) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Product not exist."
                });
        };

        const wishlistProductExist = await wishlistModel.findOne({
            user: loggedInUser,
            product: id
        });

        if (wishlistProductExist) {
            await wishlistModel.findByIdAndDelete(wishlistProductExist._id);
            return res
                .status(200)
                .json({
                    success: true,
                    message: "Wishlist removed."
                })
        }

        const newWishlist = new wishlistModel({
            user: loggedInUser,
            product: id
        });

        const savedData = await newWishlist.save();

        return res
            .status(201)
            .json({
                success: true,
                message: "Wishlist added successfully.",
                data: savedData
            })

    } catch (error) {
        return res
            .status(500)
            .json({
                success: false,
                message: "Internal Server Error",
                error: error.message
            });
    };
};

export const allWishlistController = async (req, res) => {
    try {
        const loggedInUser = req.user._id;

        if (!loggedInUser) {
            return res
                .status(403)
                .json({
                    success: false,
                    message: "Unauthorized - User"
                });
        };

        if (!mongoose.Types.ObjectId.isValid(loggedInUser)) {
            return res
                .status(403)
                .json({
                    success: false,
                    message: "Inavlid Id and Unauthorized -user"
                });
        };

        const findAllWishlist = await wishlistModel.find({
            user: loggedInUser,
        }).populate("product");

        if (!findAllWishlist || findAllWishlist.length === 0) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "No like products available."
                });
        };

        const length = findAllWishlist.length > 0 ? findAllWishlist.length : "";

        const totalPrice = findAllWishlist.reduce((acc, curr) => acc + curr.product.price, 0);

        return res
            .status(200)
            .json({
                success: true,
                message: "Data fetch successfully.",
                data: findAllWishlist,
                length: length,
                totalAmount: totalPrice
            })


    } catch (error) {
        return res
            .status(500)
            .json({
                success: false,
                message: "Internal Server Error",
                error: error.message
            })
    }
};

export const deleteWishlistController = async (req, res) => {
    try {
        const { id } = req.params;

        const loggedInUser = req.user._id;

        if (!id) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Id is missing.",
                });
        };

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Invalid MongoDB Id format."
                })
        }

        if (!loggedInUser) {
            return res
                .status(403)
                .json({
                    success: false,
                    message: "Unauthorized - User"
                });
        };

        if (!mongoose.Types.ObjectId.isValid(loggedInUser)) {
            return res
                .status(403)
                .json({
                    success: false,
                    message: "Inavlid Id and Unauthorized -user"
                });
        };

        const wishlistProductExist = await wishlistModel.findOne({
            user: loggedInUser,
            product: id
        });

        if (!wishlistProductExist) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Wishlist Product not exist."
                });
        };

        // const deleteWishlist = await wishlistModel.findOneAndDelete({
        //     user: loggedInUser,
        //     product: id
        // });

        const deleteWishlist = await wishlistModel.findByIdAndDelete(wishlistProductExist._id)

        if (!deleteWishlist) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Error occured while wishlist deleted."
                });
        };

        return res
            .status(200)
            .json({
                success: true,
                message: "Wishlist deleted successfully."
            });

    } catch (error) {
        return res
            .status(500)
            .json({
                success: false,
                message: "Internal Server Error",
                error: error.message
            })
    }
}