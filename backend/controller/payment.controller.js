import mongoose from "mongoose";
import paymentModel from "../models/payment.model.js";
import productModel from "../models/product.model.js";
import addressModel from "../models/address.model.js";

export const createPayment = async (req, res) => {
    try {
        const loggedInUser = req.user._id;

        const { status } = req.body;

        if (!loggedInUser) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Id is missing"
                });
        };

        if (!mongoose.Types.ObjectId.isValid(loggedInUser)) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Invalid mongoDb Id."
                });
        };

        const { productId } = req.params;
        const { addressId } = req.params;

        if (!addressId || !productId) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Id is missing"
                });
        };

        if (!mongoose.Types.ObjectId.isValid(addressId) || !mongoose.Types.ObjectId.isValid(productId)) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Invalid mongoDb Id"
                });
        };

        // console.log(productId)

        const productExist = await productModel.findById(productId);
        // console.log(productExist)

        if (!productExist) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Product not Exist in Db."
                });
        };

        const addressExist = await addressModel.findOne({
            user: loggedInUser,
            _id: addressId
        });

        if (!addressExist) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Address not exist."
                });
        };

        const newPayment = new paymentModel({
            user: loggedInUser,
            productId: productId,
            addressId: addressId,
            status: status || "Pending"
        });

        const savedPayment = await newPayment.save();

        return res
            .status(201)
            .json({
                success: true,
                message: "Order Created Successfully",
                data: savedPayment
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
};

export const getAllPaymentHistory = async (req, res) => {
    try {
        const loggedInUser = req.user._id;

        if (!loggedInUser) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Id is missing"
                });
        };

        if (!mongoose.Types.ObjectId.isValid(loggedInUser)) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Invalid mongoDb Id."
                });
        };

        const getPayment = await paymentModel.find({
            user: loggedInUser,
            status: "Success"
        }).populate("productId", "name price")
            .populate("user", "name email")
            .populate("addressId", "name phoneNumber state city landmark pinCode")

        if (!getPayment || getPayment.length === 0) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "No Payment found"
                });
        };

        return res
            .status(200)
            .json({
                success: true,
                message: "Payment found successfully",
                data: getPayment
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

export const getAllPendingData = async (req, res) => {
    try {
        
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