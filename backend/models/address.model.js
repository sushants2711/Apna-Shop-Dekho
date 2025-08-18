import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
    },
    phoneNumber: {
        type: String,
        required: true
    },
    fullAddress: {
        type: String,
        required: true
    },
    landmark: {
        type: String,
        required: true
    },
    pinCode: {
        type: String,
        required: true
    },
    country: {
        type: String,
        default: "India"
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, { timestamps: true });

export default mongoose.model("address", addressSchema);