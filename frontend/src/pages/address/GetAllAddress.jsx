import React, { useEffect } from "react";
import { AllAddressContext } from "../../context/AddressContext/AddressContext";
import { Link, useNavigate, useParams } from "react-router-dom";

export const GetAllAddress = () => {
  const navigate = useNavigate();
  const { allAddress, addressError, fetchAddress } = AllAddressContext();

  useEffect(() => {
    fetchAddress();
  }, []);

  const { id } = useParams();

  const handleNavigatePayment = (addId) => {
    const decode = btoa(addId);
    navigate(`/payment/${id}/${decode}`);
  };

  return (
    <main className="container my-5">
      <div className="text-end">
        <Link to="/address" className="btn btn-primary p-2">
          Create New Address
        </Link>
      </div>

      <hr />

      <section>
        {/* Error */}
        {addressError && (
          <div className="d-flex justify-content-center align-items-center text-danger">
            {addressError}
          </div>
        )}

        {/* If no error, show addresses */}
        {!addressError && allAddress?.length > 0 ? (
          <div className="row my-4">
            {allAddress.map((addr) => (
              <div
                className="col-md-4 mb-3"
                key={addr._id}
                onClick={() => handleNavigatePayment(addr._id)}
              >
                <div className="card shadow-sm p-3 h-100">
                  <h5 className="card-title">{addr.name}</h5>
                  <p className="mb-1">
                    <strong>Email:</strong> {addr.email}
                  </p>
                  <p className="mb-1">
                    <strong>Phone:</strong> {addr.phoneNumber}
                  </p>
                  <p className="mb-1">
                    <strong>Address:</strong> {addr.fullAddress}
                  </p>
                  <p className="mb-1">
                    <strong>Landmark:</strong> {addr.landmark}
                  </p>
                  <p className="mb-1">
                    <strong>Pincode:</strong> {addr.pinCode}
                  </p>
                  <p className="mb-1">
                    <strong>City:</strong> {addr.city}
                  </p>
                  <p className="mb-1">
                    <strong>State:</strong> {addr.state}
                  </p>
                  <p className="mb-1">
                    <strong>Country:</strong> {addr.country}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          !addressError && (
            <div className="text-center text-muted">No addresses found.</div>
          )
        )}
      </section>
    </main>
  );
};
