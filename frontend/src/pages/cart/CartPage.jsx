import React, { useEffect } from "react";
import { AllCartContextCustomHooks } from "../../context/CartContext/AllCartContext";
import { cartIncreaseBy1 } from "../../API/CartApi/increaseBy1";
import { handleSuccess } from "../../toastMessage/successMessage";
import { handleError } from "../../toastMessage/errorMessage";
import { cartDecreaseBy1 } from "../../API/CartApi/decreaseBy1";
import { ToastContainer } from "react-toastify";
import { handleDeleteAPI } from "../../API/CartApi/deleteCartApi";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

export const CartPage = () => {

  // useEffect(() => {
  //   document.title = "Cart-Page"
  // }, []);

  const navigate = useNavigate();

  const { cartItem, setCartItem, fetchAllCart, amount, totalcartItems } =
    AllCartContextCustomHooks();

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
        fetchAllCart()
        handleSuccess(message);
      } else {
        handleError(message || error)
      }
    } catch (error) {
      handleError(error.message)
    }
  };

  const handleDelete = async (id) => {
    try {
      const result = await handleDeleteAPI(id);
      const { success, message, error } = result;

      if (success) {
        fetchAllCart()
        if (cartItem.length === 1) {
          setCartItem([]);
        }
      } else {
        handleError(message || error);
      }
    } catch (error) {
      handleError(error.message)
    }
  };

  const handleClick = () => {
    navigate("/all/address/data");
  }

  useEffect(() => {
    fetchAllCart();
  }, []);

  return (
    <>
      <Helmet>
        <title>Your Cart | Apna Shop</title>
        <meta
          name="description"
          content="View and manage the products in your shopping cart at Apna Shop. Ready to checkout with amazing deals!"
        />
        <meta
          name="keywords"
          content="shopping cart, checkout, apna shop cart, ecommerce cart"
        />
      </Helmet>

      <main className="container my-5">
        <section>
          <h2 className="mb-4 text-center fw-bold">🛒 My Cart</h2>

          {/* Cart Summary */}
          {cartItem && cartItem.length > 0 && (
            <div className="alert alert-info d-flex justify-content-between align-items-center">
              <span>
                <strong>{totalcartItems}</strong> Products in your cart
              </span>
              <span>
                Total: <strong>₹{amount}</strong>
              </span>
            </div>
          )}


          {cartItem && cartItem.length > 0 ? (
            <>
              {/* Cart Items */}
              <div className="row g-5">
                {cartItem.map((item) => (
                  <div className="col-12" key={item._id}>
                    <div className="card shadow-sm border-0 p-3 d-flex flex-row align-items-center">
                      {/* Product Image */}
                      <img
                        src={item.product?.images[0]?.url}
                        alt={item.product?.name}
                        className="rounded"
                        style={{
                          width: "100px",
                          height: "100px",
                          objectFit: "cover",
                        }}
                      />


                      <div className="ms-3 flex-grow-1">
                        <h5 className="fw-semibold">{item.product?.name}</h5>
                        <p className="text-muted mb-1">size: {item?.size}</p>
                        <p className="text-muted mb-1">Price: ₹{item.price}</p>


                        <div className="d-flex align-items-center">
                          {item.quantity > 1 && <button className="btn btn-outline-dark btn-sm rounded-circle me-2" onClick={() => handleDecrement(item.product._id)}>
                            -
                          </button>}
                          <span className="fw-bold fs-6">{item.quantity}</span>
                          {item.quantity < 10 && <button className="btn btn-outline-dark btn-sm rounded-circle ms-2" onClick={() => handleIncrement(item.product._id)}>
                            +
                          </button>}
                        </div>
                      </div>


                      <div className="text-end me-3">
                        <h6 className="text-success fw-bold">
                          ₹{item.totalAmount}
                        </h6>
                      </div>


                      <button className="btn btn-outline-danger btn-sm" onClick={() => handleDelete(item.product._id)}>
                        🗑
                      </button>
                    </div>
                  </div>
                ))}
              </div>


              <div
                className="card shadow-lg border-0 mt-5 position-sticky bottom-0"
                style={{ zIndex: "1000" }}
              >
                <div className="card-body d-flex flex-column flex-md-row justify-content-between align-items-center">
                  <h5 className="mb-2 mb-md-0">
                    <strong>Total Amount: &nbsp; &nbsp;</strong>
                    <span className="text-success fw-bold">₹{amount}</span>
                  </h5>
                  <button className="btn btn-success btn-lg px-4" onClick={handleClick}>
                    ✅ Proceed to Checkout
                  </button>
                </div>
              </div>
            </>
          ) : (
            <h5 className=" d-flex justify-content-center align-items-center" style={{ height: "90vh" }}>
              <p className="btn btn-danger p-2">Your cart is empty.</p>
            </h5>
          )}
        </section>
      </main>
    </>
  );
};
