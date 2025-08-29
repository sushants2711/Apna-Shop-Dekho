import React, { useEffect, useState } from "react";
import { AllCartContextCustomHooks } from "../../context/CartContext/AllCartContext";
import { cartIncreaseBy1 } from "../../API/CartApi/increaseBy1";
import { handleSuccess } from "../../toastMessage/successMessage";
import { handleError } from "../../toastMessage/errorMessage";
import { cartDecreaseBy1 } from "../../API/CartApi/decreaseBy1";
import { ToastContainer } from "react-toastify";
import { handleDeleteAPI } from "../../API/CartApi/deleteCartApi";
import { useNavigate, useParams } from "react-router-dom";
import { addressById } from "../../API/AddressAPI/addressById";
import { demoAllCartPage } from "../../API/PaymentAPI/demoAllCartPage";
import { removeAllCartItems } from "../../API/CartApi/removeAllCartItems";

export const PaymentCartPage = () => {
  const { id } = useParams();

  useEffect(() => {
    document.title = "Payment-Cart-page"
  }, []);

  const navigate = useNavigate();

  const { cartItem, setCartItem, fetchAllCart, amount, totalcartItems, setTotalCartItems } =
    AllCartContextCustomHooks();

  const [address, setAddress] = useState({});
  const [addressError, setAddressError] = useState(null);
  const [buyError, setBuyError] = useState(null);


  useEffect(() => {
    if (totalcartItems === 0) {
      navigate(-1);
    };
  }, []);

  const handleIncrement = async (id) => {
    try {
      const result = await cartIncreaseBy1(id);
      const { success, message, error } = result;

      if (success) {
        fetchAllCart();
        handleSuccess(message);
      } else {
        handleError(message || error);
      }
    } catch (error) {
      handleError(error.message);
    }
  };

  const handleDecrement = async (id) => {
    try {
      const result = await cartDecreaseBy1(id);
      const { success, message, error } = result;

      if (success) {
        fetchAllCart();
        handleSuccess(message);
      } else {
        handleError(message || error);
      }
    } catch (error) {
      handleError(error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const result = await handleDeleteAPI(id);
      const { success, message, error } = result;

      if (success) {
        fetchAllCart();
        if (cartItem.length === 0) {
          setCartItem([]);
          setTotalCartItems(0)
          // window.location.reload()
        }
      } else {
        handleError(message || error);
      }
    } catch (error) {
      handleError(error.message);
    }
  };

  const handleClickToBuy = async () => {
    if (totalcartItems === 0) {
      navigate(-1);
    };
    try {
      const result = await demoAllCartPage(id);
      const { success, message, error } = result;

      if (success) {
        const removeResult = await removeAllCartItems();
        const { success: removeSuccess, message: removeMsg, error: removeError } = removeResult;

        if (removeSuccess) {
          setCartItem([]);
          fetchAllCart();

          setTimeout(() => {
            navigate("/payment/success");
          }, 1000);
        } else {
          handleError(removeMsg || removeError);
        }
      } else {
        setBuyError(message || error);
      }
    } catch (error) {
      setBuyError(error.message);
    }
  };

  const fetchAddress = async () => {
    try {
      const result = await addressById(id);
      const { success, message, error, data } = result;
      if (success) {
        setAddress(data);
      } else {
        setAddressError(message || error);
      }
    } catch (error) {
      setAddressError(error.message);
    }
  };

  useEffect(() => {
    fetchAllCart();
    fetchAddress();
  }, []);

  // console.log(cartItem);

  return (
    <main className="container my-5">
      {addressError && (
        <div className="alert alert-danger my-3">{addressError}</div>
      )}

      {buyError && <div className="alert alert-danger my-3">{buyError}</div>}

      <section>
        <h2 className="mb-4 text-center fw-bold">🛒 Checkout</h2>

        <div className="row">
          {/* Left Side - Cart Items */}
          <div className="col-12 col-lg-8 mb-4">
            {cartItem && cartItem.length > 0 ? (
              <>
                {cartItem.map((item) => (
                  <div
                    className="card shadow-sm border-2 mb-4 p-3 d-flex flex-column flex-sm-row align-items-center my-5"
                    key={item._id}
                  >
                    {/* Product Image */}
                    <img
                      src={item.product?.images[0]?.url}
                      alt={item.product?.name}
                      className="rounded mb-3 mb-sm-0"
                      style={{
                        width: "200px",
                        height: "200px",
                        objectFit: "cover",
                      }}
                    />

                    {/* Product Info */}
                    <div className="ms-md-3 flex-grow-1 text-center text-md-start">
                      <h6 className="fw-semibold">{item?.product?.name}</h6>
                      <p className="text-muted mb-1 small">
                        <b>Brand: </b> {item?.product?.brandName}
                      </p>
                      <p className="text-muted mb-1 small">
                        <b>Size: </b> {item?.size}
                      </p>
                      <p className="text-muted mb-1 ">
                        <b>Price: </b> ₹{item?.price}
                      </p>

                      {/* Quantity Controls */}
                      <div className="d-flex align-items-center justify-content-center justify-content-md-start mt-2">
                        {item.quantity > 1 && (
                          <button
                            className="btn btn-outline-dark btn-sm rounded-circle me-2"
                            onClick={() => handleDecrement(item.product._id)}
                          >
                            -
                          </button>
                        )}
                        <span className="fw-bold fs-6">{item.quantity}</span>
                        {item.quantity < 10 && (
                          <button
                            className="btn btn-outline-dark btn-sm rounded-circle ms-2"
                            onClick={() => handleIncrement(item.product._id)}
                          >
                            +
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="d-flex flex-column align-items-center align-items-md-end mt-3 mt-md-0">
                      <h6 className="text-success fw-bold mb-2">
                        ₹{item.totalAmount}
                      </h6>
                      <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => handleDelete(item.product._id)}
                      >
                        🗑 Remove
                      </button>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <h6 className="text-center text-muted my-5">
                Your cart is empty.
              </h6>
            )}
          </div>

          {/* Right Side - Address + Summary */}
          <div className="col-12 col-lg-4 mt-5">
            {/* Shipping Address */}
            {address && (
              <div className="card shadow-sm border-1 mb-4">
                <div className="card-body p-md-5">
                  <h5 className="card-title fw-bold">📍 Shipping Address</h5>
                  <hr />
                  <p className="card-text mt-4">
                    <strong>Name:</strong> {address.name}
                  </p>
                  <p className="card-text">
                    <strong>Phone:</strong> {address.phoneNumber}
                  </p>
                  <p className="card-text">
                    <strong>Email:</strong> {address.email || "-"}
                  </p>
                  <p className="card-text">
                    <strong>Address:</strong> {address.fullAddress},{" "}
                    {address.landmark}
                  </p>
                  <p className="card-text">
                    <strong>City/State/Pin:</strong> {address.city},{" "}
                    {address.state} - {address.pinCode}
                  </p>
                  <p className="card-text">
                    <strong>Country:</strong> {address.country}
                  </p>
                </div>
              </div>
            )}

            {/* Order Summary */}
            <div className="card shadow-lg border-1">
              <div className="card-body p-md-5">
                <h5 className="fw-bold mb-3">🧾 Order Summary</h5>
                <div className="d-flex justify-content-between">
                  <span>Total Items:</span>
                  <strong>{totalcartItems}</strong>
                </div>
                <div className="d-flex justify-content-between">
                  <span>Cart Value:</span>
                  <strong>₹{amount}</strong>
                </div>
                <hr />
                <div className="d-flex justify-content-between fs-5 fw-bold text-success">
                  <span>Grand Total:</span>
                  <span>₹{amount}</span>
                </div>
                <button
                  className="btn btn-success btn-lg w-100 mt-3"
                  onClick={handleClickToBuy}
                >
                  ✅ Proceed to Pay
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* <ToastContainer /> */}
      </section>
    </main>
  );
};
