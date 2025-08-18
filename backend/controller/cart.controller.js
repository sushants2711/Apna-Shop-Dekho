import mongoose from "mongoose";
import cartModel from "../models/cart.model.js";
import productModel from "../models/product.model.js";

export const addCartItems = async (req, res) => {
    try {
        const { id } = req.params;

        const loggedInUser = req.user._id;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Id is missing.",
            });
        }

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid mongoDb Id",
            });
        }

        if (!loggedInUser) {
            return res.status(400).json({
                success: false,
                message: "Logged In User Id is missing.",
            });
        }

        if (!mongoose.Types.ObjectId.isValid(loggedInUser)) {
            return res.status(400).json({
                success: false,
                message: "Invalid mongoDb Logged In User Id.",
            });
        }

        const productExist = await productModel.findById(id);

        if (!productExist) {
            return res.status(400).json({
                success: false,
                message: "Product not found.",
            });
        }

        const cartExist = await cartModel.findOne({
            user: loggedInUser,
            product: id,
        });

        if (cartExist) {
            return res.status(400).json({
                success: false,
                message: "Product already Exist in Cart.",
            });
        }

        const cartData = new cartModel({
            user: loggedInUser,
            product: id,
            price: productExist.price,
            totalAmount: productExist.price * 1,
        });

        const savedCartData = await cartData.save();

        if (!savedCartData) {
            return res.status(400).json({
                success: false,
                message: "Error occured while saving the data.",
            });
        }

        return res.status(201).json({
            success: true,
            message: "Product added successfully in Cart.",
            data: savedCartData,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};

export const getAllCartItems = async (req, res) => {
    try {
        const loggedInUser = req.user._id;

        if (!loggedInUser) {
            return res.status(400).json({
                success: false,
                message: "MongoDb id is missing.",
            });
        }

        if (!mongoose.Types.ObjectId.isValid(loggedInUser)) {
            return res.status(400).json({
                success: false,
                message: "Ivalild MongoDb Id.",
            });
        }

        const allCart = await cartModel
            .find({
                user: loggedInUser,
            })
            .populate("product");

        if (!allCart || allCart.length === 0) {
            return res.status(400).json({
                success: false,
                message: "No Items found in your cart",
            });
        }

        const totalCartLength = allCart.length;

        const totalPriceOfCart = allCart.reduce(
            (acc, curr) => acc + curr.price * curr.quantity,
            0
        );

        return res.status(200).json({
            success: true,
            message: "Data fetch successfully",
            data: allCart,
            length: totalCartLength,
            finalAllAmount: totalPriceOfCart,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};

export const deleteCartItems = async (req, res) => {
    try {
        const { id } = req.params;

        const loggedInUser = req.user._id;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Id is missing",
            });
        }

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid mongoDb Id.",
            });
        }

        if (!loggedInUser) {
            return res.status(400).json({
                success: false,
                message: "Logged In Id is missing",
            });
        }

        if (!mongoose.Types.ObjectId.isValid(loggedInUser)) {
            return res.status(400).json({
                success: false,
                message: "Invalid mongoDb Id.",
            });
        }

        const cartItemExist = await cartModel.findOne({
            user: loggedInUser,
            product: id,
        });

        if (!cartItemExist || cartItemExist.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Cart Items is missing.",
            });
        }

        const deleteCart = await cartModel.findByIdAndDelete(cartItemExist._id);

        if (!deleteCart) {
            return res.status(400).json({
                success: false,
                message: "Error occured while delete the cart items.",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Cart Items deleted successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};

export const cartIncreaseBy1 = async (req, res) => {
    try {
        const { id } = req.params;

        const loggedInUser = req.user._id;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Id is missing.",
            });
        }

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid mongoDb Id",
            });
        }

        if (!loggedInUser) {
            return res.status(400).json({
                success: false,
                message: "Logged In User Id is missing.",
            });
        }

        if (!mongoose.Types.ObjectId.isValid(loggedInUser)) {
            return res.status(400).json({
                success: false,
                message: "Invalid mongoDb Logged In User Id.",
            });
        };

        const productExist = await productModel.findById(id);

        if(!productExist) {
            return res
            .status(400)
            .json({
                success: false,
                message: "Product not exist."
            });
        };

        const cartItemExist = await cartModel.findOne({
            user: loggedInUser,
            product: id,
        });

        if (!cartItemExist) {
            return res.status(400).json({
                success: false,
                message: "Cart Items not exist.",
            });
        }

        const updateData = await cartModel.findByIdAndUpdate(
            cartItemExist._id,
            {
                quantity: cartItemExist.quantity + 1,
                price: cartItemExist.price,
                totalAmount: cartItemExist.totalAmount + cartItemExist.price,
            },
            { new: true }
        );

        if (!updateData) {
            return res.status(400).json({
                success: false,
                message: "Data fail to update",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Data update successfully",
            data: updateData,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};

export const cartDecreaseBy1 = async (req, res) => {
    try {
        const { id } = req.params;

        const loggedInUser = req.user._id;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Id is missing.",
            });
        }

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid mongoDb Id",
            });
        }

        if (!loggedInUser) {
            return res.status(400).json({
                success: false,
                message: "Logged In User Id is missing.",
            });
        }

        if (!mongoose.Types.ObjectId.isValid(loggedInUser)) {
            return res.status(400).json({
                success: false,
                message: "Invalid mongoDb Logged In User Id.",
            });
        };
        const productExist = await productModel.findById(id);

        if(!productExist) {
            return res
            .status(400)
            .json({
                success: false,
                message: "Product not exist."
            });
        };

        const cartItemExist = await cartModel.findOne({
            user: loggedInUser,
            product: id,
        });

        if (!cartItemExist) {
            return res.status(400).json({
                success: false,
                message: "Cart Items not exist.",
            });
        };

        const updateData = await cartModel.findByIdAndUpdate(
            cartItemExist._id,
            {
                quantity: cartItemExist.quantity -1,
                price: cartItemExist.price,
                totalAmount: cartItemExist.totalAmount - cartItemExist.price,
            },
            { new: true }
        );

        if (!updateData) {
            return res.status(400).json({
                success: false,
                message: "Data fail to update",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Data update successfully",
            data: updateData,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};
