import jwt from "jsonwebtoken";
import authModel from "../models/auth.model.js";


// verify the cookie that is come from browser 
export const verifyCookiesForUser = async (req, res, next) => {
    try {
        // take the token from req.cookies
        const token = req.cookies.jwt;

        // if no token 
        if (!token) {
            return res
                .status(403)
                .json({
                    success: false,
                    message: "Unauthorized User - No Token Provided"
                });
        };

        // verify the cookies
        const decode = jwt.verify(token, process.env.JWT_TOKEN);

        // if not verify then
        if (!decode) {
            return res
                .status(403)
                .json({
                    success: false,
                    message: "Jwt - Authorization failed"
                });
        };

        // if verify then check the authModel db the user is exist or not
        const user = await authModel.findById(decode.userId).select("-password");

        // if user not exist then
        if (!user) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "User not found, wrong token"
                });
        };

        // assign all the details of req.user 
        req.user = user;

        // calling the next function
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