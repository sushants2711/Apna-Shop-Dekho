import joi from "joi";

export const addProductMiddleware = async (req, res, next) => {
   
     if (req.body && typeof req.body.productDetails === "string") {
        try {
            req.body.productDetails = JSON.parse(req.body.productDetails);
        } catch (err) {
            return res.status(400).json({
                success: false,
                message: "Invalid JSON format in 'productDetails' field"
            });
        }
    }

    if (req.body && typeof req.body.highlights === "string") {
        try {
            req.body.highlights = JSON.parse(req.body.highlights);
        } catch (err) {
            return res.status(400).json({
                success: false,
                message: "Invalid JSON format in 'highlights' field"
            });
        }
    }

     if (req.body && typeof req.body.size === "string") {
        try {
            req.body.size = JSON.parse(req.body.size);
        } catch (err) {
            return res.status(400).json({
                success: false,
                message: "Invalid JSON format in 'size' field"
            });
        }
    }

    try {
        const schema = joi.object({
            name: joi.string().min(3).max(50).trim().required(),
            description: joi.string().min(10).max(350).trim().required(),
            productDetails: joi.array().items(
                joi.object({
                    title: joi.string().min(5).max(100).trim().required(),
                    description: joi.string().min(2).max(500).trim().required()
                }).required()
            ),
            price: joi.number().invalid(0).greater(0).required(),
            category: joi.string().trim().required(),
            highlights: joi.array().items(
                joi.object({
                    title: joi.string().min(5).max(100).trim().required(),
                    description: joi.string().min(2).max(500).trim().required()
                }).required()
            ),
            bestSeller: joi.boolean().optional().empty().allow(null),
            brandName: joi.string().min(5).max(50).trim().required(),
            returnPolicy: joi.string().min(5).max(100).trim().required(),
            stock: joi.number().min(0).greater(0).required(),
            size: joi.array()
                .items(joi.string().valid("S", "M", "L", "XL", "XXL", "Others"))
                .required()
        });

        const { error } = schema.validate(req.body);
        
        if(error) {
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
            success: true,
            message: "Internal Server Error",
            error: error.message
        })
    }
};