import joi from "joi";

export const addAddressMiddleware = async (req, res, next) => {
    try {
        const schema = joi.object({
            name: joi.string().min(2).max(50).required(),
            email: joi.string().email().min(9).max(50).required(),
            phoneNumber: joi.string().min(10).max(10).required(),
            fullAddress: joi.string().min(10).max(200).required(),
            landmark: joi.string().min(4).max(50).required(),
            pinCode: joi.string().min(6).max(6).required(),
            city: joi.string().min(5).max(20).required(),
            state: joi.string().min(5).max(20).required()
        });

        const { error } = schema.validate(req.body);

        if (error) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: error?.details[0].message
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
            });
    };
};

export const updateAddressMiddleware = async (req, res, next) => {
    try {
        const schema = joi.object({
            name: joi.string().min(2).max(50).optional().empty(),
            email: joi.string().email().min(9).max(50).optional().empty(),
            phoneNumber: joi.string().min(10).max(10).optional().empty(),
            fullAddress: joi.string().min(10).max(200).optional().empty(),
            landmark: joi.string().min(4).max(50).optional().empty(),
            pinCode: joi.string().min(6).max(6).optional().empty(),
            city: joi.string().min(5).max(20).optional().empty(),
            state: joi.string().min(5).max(20).optional().empty()
        });

        const { error } = schema.validate(req.body);

        if (error) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: error?.details[0].message
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
            });
    };
};