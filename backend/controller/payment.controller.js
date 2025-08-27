import mongoose from "mongoose";
import paymentModel from "../models/payment.model.js";
import productModel from "../models/product.model.js";
import addressModel from "../models/address.model.js";
import cartModel from "../models/cart.model.js";

import crypto from "crypto";

export const createPayment = async (req, res) => {
    try {
        const loggedInUser = req.user._id;

        if (!loggedInUser) {
            return res.status(400).json({
                success: false,
                message: "Id is missing",
            });
        }

        if (!mongoose.Types.ObjectId.isValid(loggedInUser)) {
            return res.status(400).json({
                success: false,
                message: "Invalid mongoDb Id.",
            });
        }

        const { productId } = req.params;
        const { addressId } = req.params;
        const { amount, size } = req.params;

        if (!addressId || !productId || !amount || !size) {
            return res.status(400).json({
                success: false,
                message: "Id is missing",
            });
        }

        if (
            !mongoose.Types.ObjectId.isValid(addressId) ||
            !mongoose.Types.ObjectId.isValid(productId)
        ) {
            return res.status(400).json({
                success: false,
                message: "Invalid mongoDb Id",
            });
        }

        // console.log(productId)

        const productExist = await productModel.findById(productId);
        // console.log(productExist)

        if (!productExist) {
            return res.status(400).json({
                success: false,
                message: "Product not Exist in Db.",
            });
        }

        const addressExist = await addressModel.findOne({
            user: loggedInUser,
            _id: addressId,
        });

        if (!addressExist) {
            return res.status(400).json({
                success: false,
                message: "Address not exist.",
            });
        }

        const newPayment = new paymentModel({
            user: loggedInUser,
            products: [
                {
                    productId,
                    size,
                },
            ],
            addressId: addressId,
            totalAmount: amount,
        });

        const savedPayment = await newPayment.save();

        return res.status(201).json({
            success: true,
            message: "Order Created Successfully",
            data: savedPayment,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};

// order - history
export const getAllPaymentHistory = async (req, res) => {
    try {
        const loggedInUser = req.user._id;

        if (!loggedInUser) {
            return res.status(400).json({
                success: false,
                message: "Id is missing",
            });
        }

        if (!mongoose.Types.ObjectId.isValid(loggedInUser)) {
            return res.status(400).json({
                success: false,
                message: "Invalid mongoDb Id.",
            });
        }

        const getPayment = await paymentModel
            .find({
                user: loggedInUser,
            })
            .populate({
                path: "products.productId",
                select: "name price images",
            })
            .populate("user", "name email")
            .populate("addressId", "name phoneNumber state city landmark pinCode")
            .sort({ updatedAt: -1 });

        if (!getPayment || getPayment.length === 0) {
            return res.status(400).json({
                success: false,
                message: "No Payment found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Order Details Found Successfully",
            data: getPayment,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};

export const getAllCartItemsPayment = async (req, res) => {
    try {
        const loggedInUser = req.user._id;

        // const { amount } = req.params;

        // if (!amount) {
        //     return res
        //         .status(400)
        //         .json({
        //             success: false,
        //             message: "Amount Id is missing"
        //         });
        // };

        const { addressId } = req.params;

        if (!addressId) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Address is missing."
                });
        };

        if (!mongoose.Types.ObjectId.isValid(addressId)) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Invalid mongoDb address Id format."
                })
        }

        if (!loggedInUser) {
            return res.status(400).json({
                success: false,
                message: "LoggedIn Id is missing",
            });
        }

        if (!mongoose.Types.ObjectId.isValid(loggedInUser)) {
            return res.status(400).json({
                success: false,
                message: "Invalid mongoDb Id.",
            });
        }

        const allProductData = await cartModel
            .find({ user: loggedInUser })
            .populate("product", "name price ")
            .populate("user", "name email");

        if (!allProductData || allProductData.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No items found in cart.",
            });
        }

        const products = allProductData.map((curr) => ({
            productId: curr.product._id,
            quantity: curr.quantity,
            size: curr.size,
        }));

        const amount = allProductData.reduce((acc, curr) => acc + curr.totalAmount, 0);

        const newPyament = new paymentModel({
            user: loggedInUser,
            products: products,
            addressId: addressId,
            totalAmount: amount
        });

        const saveData = await newPyament.save();

        return res
            .status(201)
            .json({
                success: true,
                message: "Your Order is created successfully.",
                data: saveData
            });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};


//  payment configuration

import { instance } from "../config/razorpay.config.js";

export const processPayment = async (req, res) => {
    try {
        const { amount } = req.body;

        if (!amount) {
            return res.status(400).json({
                success: false,
                message: "Amount is required",
            });
        }

        const options = {
            amount: Number(amount) * 100,
            currency: "INR",
        };
        const order = await instance.orders.create(options);
        return res.status(200).json({
            success: true,
            message: "Order created successfully",
            data: order,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};

export const getKey = async (req, res) => {
    try {
        return res.status(200).json({
            key: process.env.RAZORPAY_KEY_ID,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};

export const paymentVerification = async (req, res) => {
    try {
        const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
            req.body;

        const body = razorpay_order_id + " | " + razorpay_payment_id;

        const exceptedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(body.toString())
            .digest("hex");

        console.log(razorpay_signature);
        console.log(exceptedSignature);

        const isAuthentic = exceptedSignature === razorpay_signature;

        if (isAuthentic) {
            return res.redirect(
                `http://localhost:5173/paymentSuccess?refrence=${razorpay_payment_id}`
            );
        } else {
            return res.status(400).json({
                success: false,
                message: "Payment failed",
            });
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};
