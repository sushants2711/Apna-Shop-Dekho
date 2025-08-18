import jwt from "jsonwebtoken";
import authModel from "../models/auth.model.js";

// for admin user cookies
export const verifyCookiesForAdmin = async (req, res, next) => {
    try {
         // accept the token in form of cookies
        const token = req.cookies.jwt;

         // if no token return 
        if(!token) {
            return res
                .status(403)
                .json({
                    success: false,
                    message: "Unauthorized User - No Token Provided"
                });
        };

         // verify the token or cookies
        const decode = jwt.verify(token, process.env.JWT_TOKEN);

         // if not decode the token
        if(!decode) {
            return res
                .status(403)
                .json({
                    success: false,
                    message: "Jwt - Authorization failed"
                });
        };

        // check user data is available in Db or not.
        const user = await authModel.findById(decode.userId).select("-password");

        // if no user find then return 
        if (!user) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "User not found, wrong token"
                });
        };

         // role is not equal to admin then 
        if(user.role !== "admin") {
            return res
                .status(403)
                .json({
                    success: false,
                    message: "Only admin can create a product"
                });
        }

         // assign the value in req.user
        req.user = user;

        // calling a new function
        next();

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