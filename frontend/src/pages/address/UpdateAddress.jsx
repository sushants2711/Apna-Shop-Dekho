import React from "react";
import { handleError } from "../../toastMessage/errorMessage";
import { useState } from "react";
import { handleSuccess } from "../../toastMessage/successMessage";
import { ToastContainer } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { AllAddressContext } from "../../context/AddressContext/AddressContext";
import { updateAddressApi } from "../../API/AddressAPI/updateAddress";

export const UpdateAddress = () => {
    const navigate = useNavigate();
    const { fetchAddress } = AllAddressContext();

    const [form, setFormData] = useState({
        name: "",
        email: "",
        phoneNumber: "",
        fullAddress: "",
        landmark: "",
        pinCode: "",
        city: "",
        state: "",
    });

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setFormData({
            ...form,
            [name]: value,
        });
    };

    const { id } = useParams();

    let decode = "";

    if(id) {
        decode = btoa(id);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const {
            name,
            email,
            phoneNumber,
            fullAddress,
            landmark,
            pinCode,
            city,
            state,
        } = form;

        if (
            !name &&
            !email &&
            !phoneNumber &&
            !fullAddress &&
            !landmark &&
            !pinCode &&
            !city &&
            !state
        ) {
            return handleError("At least one field is required.");
        }

        if (email && !email.includes("@")) {
            return handleError("Not a Valid Email.");
        }

        if (phoneNumber && !phoneNumber.length === 10) {
            return handleError("Phone Number Should exactly 10 digits.");
        }

        try {
            const result = await updateAddressApi(decode, form);
            const { success, message, error } = result;

            if (success) {
                handleSuccess(message);
                fetchAddress();
                setFormData({
                    name: "",
                    email: "",
                    phoneNumber: "",
                    fullAddress: "",
                    landmark: "",
                    pinCode: "",
                    city: "",
                    state: "",
                });
                setTimeout(() => {
                    navigate(-1);
                }, 2000);
            } else {
                handleError(message || error);
            }
        } catch (error) {
            handleError(error.message);
        }
    };
    return (
        <div className="container mt-4">
            <h3 className="text-center mb-4">Update Your Address</h3>
            <form className="row g-3 my-5" onSubmit={handleSubmit}>
                <div className="col-md-6">
                    <label htmlFor="name" className="form-label">
                        Name
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        placeholder="Enter Your Name"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                    />
                </div>

                <div className="col-md-6">
                    <label htmlFor="email" className="form-label">
                        Email
                    </label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="Enter Your Email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                    />
                </div>

                <div className="col-md-6">
                    <label htmlFor="phone" className="form-label">
                        Phone Number
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="phone"
                        placeholder="Enter Your Phone Number"
                        name="phoneNumber"
                        value={form.phoneNumber}
                        onChange={handleChange}
                    />
                </div>

                <div className="col-12">
                    <label htmlFor="address" className="form-label">
                        Full Address
                    </label>
                    <textarea
                        type="text"
                        className="form-control"
                        id="address"
                        placeholder="Enter Your Address"
                        name="fullAddress"
                        value={form.fullAddress}
                        onChange={handleChange}
                        rows={3}
                    ></textarea>
                </div>

                <div className="col-md-6">
                    <label htmlFor="landmark" className="form-label">
                        Landmark
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="landmark"
                        placeholder="Enter Your Landmark"
                        name="landmark"
                        value={form.landmark}
                        onChange={handleChange}
                    />
                </div>

                <div className="col-md-6">
                    <label htmlFor="pin" className="form-label">
                        Pincode
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="pin"
                        placeholder="Enter Your Pincode"
                        name="pinCode"
                        value={form.pinCode}
                        onChange={handleChange}
                    />
                </div>

                <div className="col-md-6">
                    <label htmlFor="city" className="form-label">
                        City
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="city"
                        placeholder="Enter Your City"
                        name="city"
                        value={form.city}
                        onChange={handleChange}
                    />
                </div>

                <div className="col-md-6">
                    <label htmlFor="state" className="form-label">
                        State
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="state"
                        placeholder="Enter Your State"
                        name="state"
                        value={form.state}
                        onChange={handleChange}
                    />
                </div>

                <div className="col-12 text-center">
                    <button type="submit" className="btn btn-primary px-4">
                        Submit
                    </button>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
};
