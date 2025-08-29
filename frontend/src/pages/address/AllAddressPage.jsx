// import React, { useEffect } from "react";
// import { AllAddressContext } from "../../context/AddressContext/AddressContext";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import { handleError } from "../../toastMessage/errorMessage";
// import { deleteAddressApi } from "../../API/AddressAPI/deleteAddress";
// import { handleSuccess } from "../../toastMessage/successMessage";
// import { ToastContainer } from "react-toastify";

// export const AllAddressPage = () => {
//   const navigate = useNavigate();
//   const { allAddress, addressError, fetchAddress } = AllAddressContext();

//   useEffect(() => {
//     fetchAddress();
//   }, []);

//   const handleNavigatePayment = (addId) => {
//     // const decode = btoa(addId);
//     navigate(`/payment-page/${addId}`);
//   };

//   const handleDeleteAddress = async (id) => {
//     try {
//       const result = await deleteAddressApi(id);
//       const { success, message, error } = result;
//       if (success) {
//         handleSuccess(message);
//         fetchAddress();
//       } else {
//         handleError(error.message);
//       }
//     } catch (error) {
//       handleError(error.message);
//     }
//   }

//   const handleToUpdate = (id) => {
//     const decode = atob(id);
//     navigate(`/address/update/${decode}`);
//   }

//   return (
//     <main className="container my-5">
//       <div className="text-end">
//         <Link to="/address" className="btn btn-primary p-2">
//           Create New Address
//         </Link>
//       </div>

//       <hr />

//       <section>
//         {/* Error */}
//         {addressError && (
//           <div className="d-flex justify-content-center align-items-center text-danger">
//             {addressError}
//           </div>
//         )}

//         {/* If no error, show addresses */}
//         {!addressError && allAddress?.length > 0 ? (
//           <div className="row my-4">
//             {allAddress.map((addr) => (
//               <div
//                 className="col-md-4 mb-3"
//                 key={addr._id}
//                 // onClick={() => handleNavigatePayment(addr._id)}
//               >
//                 <div className="card shadow-sm p-3 h-100 position-relative">

//                   <div className="position-absolute top-0 end-0 m-2 d-flex gap-2">
//                     <button
//                       className="btn btn-sm btn-outline-primary"
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         handleToUpdate(addr._id);
//                       }}
//                     >
//                       ✏️
//                     </button>
//                     <button
//                       className="btn btn-sm btn-outline-danger"
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         handleDeleteAddress(addr._id);
//                       }}
//                     >
//                       🗑️
//                     </button>
//                   </div>

//                   <h5 className="card-title">{addr.name}</h5>
//                   <p className="mb-1">
//                     <strong>Email:</strong> {addr.email}
//                   </p>
//                   <p className="mb-1">
//                     <strong>Phone:</strong> {addr.phoneNumber}
//                   </p>
//                   <p className="mb-1">
//                     <strong>Address:</strong> {addr.fullAddress}
//                   </p>
//                   <p className="mb-1">
//                     <strong>Landmark:</strong> {addr.landmark}
//                   </p>
//                   <p className="mb-1">
//                     <strong>Pincode:</strong> {addr.pinCode}
//                   </p>
//                   <p className="mb-1">
//                     <strong>City:</strong> {addr.city}
//                   </p>
//                   <p className="mb-1">
//                     <strong>State:</strong> {addr.state}
//                   </p>
//                   <p className="mb-1">
//                     <strong>Country:</strong> {addr.country}
//                   </p>

//                   <div>
//                       <input type="radio" name="addressName"  onClick={() => handleNavigatePayment(addr._id)}/>
//                     </div>
//                 </div>
//                 <ToastContainer />
//               </div>
//             ))}

//           </div>
//         ) : (
//           !addressError && (
//             <div className="text-center text-muted">No addresses found.</div>
//           )
//         )}
//       </section>
//     </main>
//   );
// };

import React, { useEffect, useState } from "react";
import { AllAddressContext } from "../../context/AddressContext/AddressContext";
import { Link, useNavigate } from "react-router-dom";
import { handleError } from "../../toastMessage/errorMessage";
import { deleteAddressApi } from "../../API/AddressAPI/deleteAddress";
import { handleSuccess } from "../../toastMessage/successMessage";
import { ToastContainer } from "react-toastify";

export const AllAddressPage = () => {
  const navigate = useNavigate();
  const { allAddress, addressError, fetchAddress } = AllAddressContext();
  const [selectedAddress, setSelectedAddress] = useState(null);

  useEffect(() => {
    fetchAddress();
  }, []);

  useEffect(() => {
    document.title = "Address-page"
  }, [])

  const handleProceedPayment = () => {
    if (!selectedAddress) {
      handleError("Please select an address first.");
      return;
    }
    navigate(`/payment-page/${selectedAddress}`);
  };

  const handleDeleteAddress = async (id) => {
    try {
      const result = await deleteAddressApi(id);
      const { success, message, error } = result;
      if (success) {
        handleSuccess(message);
        fetchAddress();
      } else {
        handleError(error.message);
      }
    } catch (error) {
      handleError(error.message);
    }
  };

  const handleToUpdate = (id) => {
    const decode = atob(id);
    navigate(`/address/update/${decode}`);
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
        {addressError && (
          <div className="d-flex justify-content-center align-items-center text-danger">
            {addressError}
          </div>
        )}

        {!addressError && allAddress?.length > 0 ? (
          <>
            <div className="row my-4">
              {allAddress.map((addr) => (
                <div className="col-md-4 mb-3" key={addr._id}>
                  <div className="card shadow-sm p-3 h-100 position-relative">
                    <div className="position-absolute top-0 end-0 m-2 d-flex gap-2">
                      <button
                        className="btn btn-sm btn-outline-primary"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToUpdate(addr._id);
                        }}
                      >
                        ✏️
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteAddress(addr._id);
                        }}
                      >
                        🗑️
                      </button>
                    </div>

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

                    <div className="mt-3">
                      <input
                        type="radio"
                        className="btn-check"
                        id={`ad-${addr._id}`}
                        name="addressName"
                        checked={selectedAddress === addr._id}
                        onChange={() => setSelectedAddress(addr._id)}
                      // autoComplete="off"
                      />
                      <label
                        htmlFor={`ad-${addr._id}`}
                        className="btn btn-outline-primary"
                      >
                        Select this address
                      </label>
                    </div>
                  </div>
                  <ToastContainer />
                </div>
              ))}
            </div>

            <div className="text-center mt-4">
              <button
                className="btn btn-success w-100 w-md-auto px-4 rounded"
                onClick={handleProceedPayment}
                disabled={!selectedAddress}
              >
                Proceed to Payment
              </button>
            </div>

          </>
        ) : (
          !addressError && (
            <div className="text-center text-muted">No addresses found.</div>
          )
        )}
      </section>
    </main>
  );
};
