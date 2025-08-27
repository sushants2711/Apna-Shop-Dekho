import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    products: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: true
            },
            quantity: {
                type: Number,
                default: 1
            },
            size: {
                type: String,
            }
        }
    ],
    addressId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Address",
        required: true
    },
    totalAmount: {
        type: Number,
        required: true
    },
    paymentId: {
        type: String,
        // required: true
    }
}, { timestamps: true });

export default mongoose.model("Payment", paymentSchema);
