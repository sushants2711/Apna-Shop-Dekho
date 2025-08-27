import jwt from "jsonwebtoken";

export const sendCookies = async (userId, res) => {
    try {
        const token = jwt.sign(
            { userId },
            process.env.JWT_TOKEN,
            {
                expiresIn: "30d",
            }
        );

        res.cookie("jwt", token, {
            maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days in millisecond
            httpOnly: true, // prevent from XSS attacks cross-site scripting attacks
            sameSite: "None", // CSRF attacks cross-site request forgery attacks
            // sameSite: "Strict", // for development
            // secure: process.env.NODE_ENV !== "development" // for development
            secure: true
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};
