import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleError } from "../../toastMessage/errorMessage";
import { getAllProfileData } from "../../API/UserProfile/getAllProfileData";
import { Pencil } from "lucide-react";
import { Helmet } from "react-helmet";

export const UserProfile = () => {
  const [profileData, setProfileData] = useState({});
  const [profileError, setProfileError] = useState(null);

  const getEmail = localStorage.getItem("email");

  const navigate = useNavigate();

  const fetchUserProfile = async () => {
    try {
      const result = await getAllProfileData();
      const { success, message, error, data } = result;

      if (success) {
        setProfileData(data);
      } else if (!success) {
        handleError(message);
        setProfileError(message);
      } else {
        handleError(error);
        setProfileError(error);
      }
    } catch (error) {
      handleError(error.message);
      setProfileError(error.message);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, [getEmail]);

  // useEffect(() => {
  //   document.title = "Profile-Page"
  // }, []);

  const handleClickToUpdate = () => {
    navigate("/user/profile-update");
  };

  return (
    <>
      <Helmet>
        <title>User Profile | Apna Shop</title>
        <meta
          name="description"
          content="View and manage your Apna Shop profile, orders, and account settings in one place."
        />
        <meta
          name="keywords"
          content="user profile, account, Apna Shop profile, shopping account"
        />
      </Helmet>
      <div className="container mt-5">
        <div className="card shadow-sm border-0">
          <div className="card-header d-flex justify-content-between align-items-center">
            <h4 className="mb-0">User Profile</h4>
            <button
              className="btn btn-primary btn-sm d-flex align-items-center gap-1"
              onClick={handleClickToUpdate}
            >
              <Pencil size={20} />
            </button>
          </div>

          <div className="card-body">
            {profileError ? (
              <p className="text-danger">{profileError}</p>
            ) : (
              <table className="table table-borderless">
                <tbody>
                  <tr>
                    <th scope="row">Name</th>
                    <td>{profileData?.name}</td>
                  </tr>
                  <tr>
                    <th scope="row">Email</th>
                    <td>{profileData?.email}</td>
                  </tr>
                  <tr>
                    <th scope="row">Phone Number</th>
                    <td>{profileData?.phoneNumber}</td>
                  </tr>
                  <tr>
                    <th scope="row">Role</th>
                    <td>
                      <span className="badge bg-success">
                        {profileData?.role}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Created At</th>
                    <td>
                      {profileData?.createdAt &&
                        new Date(profileData.createdAt).toLocaleString()}
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Updated At</th>
                    <td>
                      {profileData?.updatedAt &&
                        new Date(profileData.updatedAt).toLocaleString()}
                    </td>
                  </tr>
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
