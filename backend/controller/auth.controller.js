import authModel from "../models/auth.model.js";
import bcrypt from "bcryptjs";
import { sendCookies } from "../middleware/send.cookies.js";
import mongoose from "mongoose";

// signu - done
export const signupController = async (req, res) => {
    try {
        // take all the request from req.body
        const { name, email, password, confirmPassword, phoneNumber } = req.body;

        // if password in not equal to confirm password
        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Password not match",
            });
        }

        // check user email already exist in db or not
        const userExist = await authModel.findOne({ email });

        // if user email exist in db than return error message
        if (userExist) {
            return res.status(400).json({
                success: false,
                message: "User is already exist",
            });
        }

        // if user phone exist in db than return error message
        const phoneExist = await authModel.findOne({ phoneNumber });

        if (phoneExist) {
            return res.status(400).json({
                success: false,
                message: "Phone number is already exist in different account",
            });
        }
        
        // hash number
        const salt_round = 10;
        // hash password
        const hash_Password = await bcrypt.hash(password, salt_round);

        // create a new instance of authModel
        const newUser = new authModel({
            name,
            email,
            phoneNumber,
            password: hash_Password,
        });

        // save the data in our mongoDb database
        await newUser.save();

        // send a cookies in browser
        await sendCookies(newUser._id, res);

        // return a success message to the user
        return res.status(201).json({
            success: true,
            message: "User created successfully",
            name: newUser.name,
            email: newUser.email,
            phoneNumber: newUser.phoneNumber,
            role: newUser.role,
        });

        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};

// login - done
export const loginController = async (req, res) => {
    try {
        // take all the request from req.body
        const { email, password } = req.body;

        // check user exist or not
        const userExist = await authModel.findOne({ email });

        // if user not exist then
        if (!userExist) {
            return res.status(400).json({
                success: false,
                message: "User not exist",
            });
        }

        // compare the password
        const compare_password = await bcrypt.compare(password, userExist.password);

        // if password not match
        if (!compare_password) {
            return res.status(400).json({
                success: false,
                message: "Wrong password",
            });
        }

        // send a cookies if password match
        await sendCookies(userExist._id, res);

        // return a success message
        return res.status(200).json({
            success: true,
            message: "User logged in successfully",
            name: userExist.name,
            email: userExist.email,
            role: userExist.role,
            phoneNumber: userExist.phoneNumber,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};

// logout - done
export const logoutController = async (req, res) => {
    try {
        const loggedInUser = req.user._id;

        if (!loggedInUser) {
            return res.status(403).json({
                success: false,
                message: "User id is missing.",
            });
        }

        if (!mongoose.Types.ObjectId.isValid(loggedInUser)) {
            return res.status(403).json({
                success: false,
                message: "Invalid mongoDb Id format.",
            });
        }

        res.cookie("jwt", "", { maxAge: 0 });
        return res.status(200).json({
            success: true,
            message: "Logout successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};

// delete - done
export const deleteController = async (req, res) => {
    try {
        // take all the request from req.body
        const { name, email, phoneNumber, password } = req.body;

        // get loogedInUser from cookies
        const loggedInUser = req.user._id;

        // if not found loggedInUser
        if (!loggedInUser) {
            return res.status(403).json({
                success: false,
                message: "User id is missing.",
            });
        }

        // check the id is mongoose type or not
        if (!mongoose.Types.ObjectId.isValid(loggedInUser)) {
            return res.status(403).json({
                success: false,
                message: "Invalid mongoDb Id format.",
            });
        }

        // check the user exist or not
        const userExist = await authModel.findOne({ email });

        // if not then throw an error
        if (!userExist) {
            return res.status(400).json({
                success: false,
                message: "User not exist in db.",
            });
        };

        // if userExist id !== loggedInUser id
        if (userExist._id.toString() !== loggedInUser.toString()) {
            return res.status(403).json({
                success: false,
                message: "You should only delete their own account",
            });
        }

        // comapre the password
        const compare_password = await bcrypt.compare(password, userExist.password);

        // if password not match then
        if (!compare_password) {
            return res.status(400).json({
                success: false,
                message: "Password not match",
            });
        }

        // check all the fields are correct or not
        if (
            name.trim().toLowerCase() !== userExist.name.trim().toLowerCase() ||
            email.trim().toLowerCase() !== userExist.email.trim().toLowerCase() ||
            phoneNumber !== userExist.phoneNumber
        ) {
            return res.status(400).json({
                success: false,
                message: "Please check the details again",
            });
        };

        // delete the data from db
        await authModel.findByIdAndDelete(loggedInUser);

        // clear the cookie from browser
        res.clearCookie("jwt");

        // return a success message
        return res.status(200).json({
            success: true,
            message: "User deleted successfully.",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};
