import React, { useEffect, useState } from "react";
import { getAllProfileData } from "../../API/UserProfile/getAllProfileData";
import { handleError } from "../../toastMessage/errorMessage";
import { updateUserProfileData } from "../../API/UserProfile/updateUserProfile";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleSuccess } from "../../toastMessage/successMessage";

export const UpdateProfilePage = () => {
    const [profileData, setProfileData] = useState({
        name: "",
        email: "",
        password: "",
        phoneNumber: ""
    });

    const navigate = useNavigate();

    useEffect(() => {
        document.title = "UpdatePage"
    }, []);

    const fetchUserProfile = async () => {
        try {
            const result = await getAllProfileData();
            const { success, message, error, data } = result;

            if (success) {
                setProfileData({
                    name: data?.name,
                    email: data?.email,
                    phoneNumber: data?.phoneNumber,
                    password: data?.password
                })
            } else if (!success) {
                handleError(message);
            } else {
                handleError(error);
            }
        } catch (error) {
            handleError(error.message);
        }
    };

    useEffect(() => {
        fetchUserProfile();
    }, []);

    const handleChnage = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setProfileData({
            ...profileData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const result = await updateUserProfileData(profileData);
            const { success, message, error, data } = result;

            if (success) {
                setProfileData({
                    name: "",
                    email: "",
                    phoneNumber: "",
                    password: ""
                });
                handleSuccess(message)
                setTimeout(() => {
                    navigate("/user/profile");
                }, 2000);
            } else if (!success) {
                handleError(message);
            } else {
                handleError(error);
            }
        } catch (error) {
            handleError(error.message)
        }
    }


    return (
        <div className="container mt-5">
            <div className="card shadow-sm border-0">
                <div className="card-header">
                    <h4 className="mb-0">Update Profile</h4>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="card-body">
                        <table className="table table-borderless">
                            <tbody>
                                <tr>
                                    <th scope="row">Name</th>
                                    <td>
                                        <input
                                            name="name"
                                            onChange={handleChnage}
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter your name"
                                            value={profileData.name}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">Email</th>
                                    <td>
                                        <input
                                            name="email"
                                            onChange={handleChnage}
                                            type="email"
                                            className="form-control"
                                            placeholder="Enter your email"
                                            value={profileData.email}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">Phone Number</th>
                                    <td>
                                        <input
                                            name="phoneNumber"
                                            onChange={handleChnage}
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter your phone number"
                                            value={profileData.phoneNumber}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">Password</th>
                                    <td>
                                        <input
                                            name="password"
                                            onChange={handleChnage}
                                            type="password"
                                            className="form-control"
                                            placeholder="Enter new password"
                                            value={profileData.password}
                                        />
                                    </td>
                                </tr>

                            </tbody>
                        </table>
                        <button type="submit" className="btn btn-primary container mt-5">Submit</button>
                    </div>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
};
