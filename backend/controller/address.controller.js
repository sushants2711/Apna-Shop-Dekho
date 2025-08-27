import authModel from "../models/auth.model.js";
import addressModel from "../models/address.model.js";
import mongoose from "mongoose";

export const postAddressController = async (req, res) => {
    try {
        const {
            name,
            email,
            phoneNumber,
            fullAddress,
            landmark,
            pinCode,
            city,
            state,
        } = req.body;

        const loggedInUser = req.user._id;

        if (!loggedInUser) {
            return res.status(400).json({
                success: false,
                message: "Logged In Id is missing",
            });
        }

        if (!mongoose.Types.ObjectId.isValid(loggedInUser)) {
            return res.status(400).json({
                success: false,
                message: "Invalid MongoDb Id.",
            });
        }

        const newAddress = new addressModel({
            name,
            email,
            phoneNumber,
            fullAddress,
            landmark,
            pinCode,
            city,
            state,
            user: loggedInUser,
        });

        const savedAddress = await newAddress.save();

        return res.status(201).json({
            success: true,
            message: "New Address Created Successfully",
            data: savedAddress,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};

export const getAllAddressController = async (req, res) => {
    try {
        const loggedInUser = req.user._id;

        if (!loggedInUser) {
            return res.status(400).json({
                success: false,
                message: "Logged In Id is missing",
            });
        }

        if (!mongoose.Types.ObjectId.isValid(loggedInUser)) {
            return res.status(400).json({
                success: false,
                message: "Invalid MongoDb Id.",
            });
        }

        const addressFind = await addressModel.find({
            user: loggedInUser,
        });

        if (!addressFind || addressFind.length === 0) {
            return res.status(200).json({
                success: false,
                message: "Currently you can't create any address.",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Address fetch Successfully",
            data: addressFind,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};

export const deleteAddressController = async (req, res) => {
    try {
        const { id } = req.params;

        const loggedInUser = req.user._id;

        if (!loggedInUser) {
            return res.status(400).json({
                success: false,
                message: "Logged In Id is missing",
            });
        }

        if (!mongoose.Types.ObjectId.isValid(loggedInUser)) {
            return res.status(400).json({
                success: false,
                message: "Invalid MongoDb Id.",
            });
        }

        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Id is missing",
            });
        }

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid MongoDb Id.",
            });
        }

        const addressExist = await addressModel.findOne({
            _id: id,
            user: loggedInUser,
        });

        if (!addressExist) {
            return res.status(400).json({
                success: false,
                message: "Address not Exist.",
            });
        }

        const deleteAddress = await addressModel.findByIdAndDelete(
            addressExist._id
        );

        if (!deleteAddress) {
            return res.status(400).json({
                success: false,
                message: "Error Occured while deleted the data.",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Address deleted successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};

export const updateAddressController = async (req, res) => {
    try {
        const {
            name,
            email,
            phoneNumber,
            fullAddress,
            landmark,
            pinCode,
            city,
            state,
        } = req.body;

        const { id } = req.params;

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

        const loggedInUser = req.user._id;

        if (!loggedInUser) {
            return res.status(400).json({
                success: false,
                message: "Logged In Id is missing",
            });
        }

        if (!mongoose.Types.ObjectId.isValid(loggedInUser)) {
            return res.status(400).json({
                success: false,
                message: "Invalid MongoDb Id.",
            });
        }

        const addressExist = await addressModel.findOne({
            user: loggedInUser,
            _id: id,
        });

        if (!addressExist) {
            return res.status(400).json({
                success: false,
                message: "Address not exist.",
            });
        }

        const updateAddress = {
            name: name || addressExist.name,
            email: email || addressExist.email,
            phoneNumber: phoneNumber || addressExist.phoneNumber,
            fullAddress: fullAddress || addressExist.fullAddress,
            landmark: landmark || addressExist.landmark,
            pinCode: pinCode || addressExist.pinCode,
            city: city || addressExist.city,
            state: state || addressExist.state,
            user: loggedInUser,
        };

        const updateData = await addressModel.findByIdAndUpdate(
            addressExist._id,
            updateAddress,
            { new: true }
        );

        if (!updateData) {
            return res.status(400).json({
                success: false,
                message: "Error Occured while update the Data",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Data updated successfully",
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

export const addressByIdData = async (req, res) => {
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
                message: "Invalid mongoDb Id format",
            });
        }

        if (!loggedInUser) {
            return res.status(400).json({
                success: false,
                message: "LoggedIn User Id is Missing",
            });
        }

        if (!mongoose.Types.ObjectId.isValid(loggedInUser)) {
            return res.status(400).json({
                success: false,
                message: "Invalid mongoDb Id format",
            });
        }

        const addressExist = await addressModel.findOne({
            user: loggedInUser,
            _id: id,
        });

        if (!addressExist) {
            return res.status(400).json({
                success: false,
                message: "Address not Exist",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Address fetch successfully",
            data: addressExist,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};
