import joi from "joi";

export const signupMiddleware = async (req, res, next) => {
    try {
        // create a schema with the help of joi
        const schema = joi.object({
            name: joi.string().min(2).max(50).required().trim(),
            email: joi.string().email().min(8).max(50).required().trim().lowercase(),
            phoneNumber: joi
                .string()
                .required()
                .min(10)
                .max(10)
                .pattern(/^[6-9][0-9]{9}$/)
                .trim(),
            password: joi.string().min(8).max(100).required(),
            confirmPassword: joi.string().min(8).max(100).required(),
        });

        // if error occured from body while checking the req.body
        const { error } = schema.validate(req.body);

        // If error occured in data validation
        if (error) {
            return res.status(400).json({
                success: false,
                message: error?.details[0].message,
            });
        }
        // next function should be call if data should validate successfully
        next();

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};

export const loginMiddleware = async (req, res, next) => {
    try {
        // create a schema with the help of joi
        const schema = joi.object({
            email: joi.string().email().min(8).max(50).required().trim().lowercase(),
            password: joi.string().min(8).max(100).required()
        });

        // if error occured from body while checking the req.body
        const { error } = schema.validate(req.body);

        // if error occured then
        if (error) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: error?.details[0].message
                });
        };

        // next function should be call if data should validate successfully
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
};

export const updateUserProfileMiddleware = async (req, res, next) => {
    try {
        const schema = joi.object({
            name: joi.string().min(2).max(50).trim().optional().empty(),
            email: joi.string().email().min(8).max(50).trim().lowercase().optional().empty(),
            phoneNumber: joi
                .string()
                .min(10)
                .max(10)
                .pattern(/^[6-9][0-9]{9}$/)
                .trim()
                .optional()
                .empty(),
            password: joi.string().min(8).max(100).optional().empty(),
        });

        const { error } = schema.validate(req.body);

        if (error) {
            return res.status(400).json({
                success: false,
                message: error?.details[0].message,
            });
        };

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