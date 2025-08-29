import React, { useEffect, useState } from "react";
import { allAuthContext } from "../../context/AuthContext/AuthContext";
import { Delete } from "lucide-react";
import { allWishlistContext } from "../../context/WithlistContext/FetchAllWishlist";
import { handleError } from "../../toastMessage/errorMessage";
import { deleteWishlist } from "../../API/wishlist/deleteWishlist";
import { handleSuccess } from "../../toastMessage/successMessage";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { addCartAPI } from "../../API/CartApi/addCart";

export const AllWishlistPage = () => {
  const navigate = useNavigate();
  const { fetchDetailsFromLocalStorage, userName } = allAuthContext();

  const { wishlist, wishlistError, lengthWishlist, amount, fetchWishlist } =
    allWishlistContext();

  // ✅ Track selected size for each product
  const [selectedSizes, setSelectedSizes] = useState({});

  useEffect(() => {
    fetchDetailsFromLocalStorage();
    fetchWishlist();
  }, []);

  useEffect(() => {
    document.title = "AllWishlist Page"
  }, []);

  const handleDeleteWishlist = async (id) => {
    try {
      const result = await deleteWishlist(id);
      const { success, message, error } = result;

      if (success) {
        handleSuccess(message);
        fetchWishlist();
      } else {
        handleError(message || error);
      }
    } catch (error) {
      handleError(error.message);
    }
  };

  const handleDetailsPage = (id) => {
    const encoded = btoa(id);
    navigate(`/product/details/${encoded}`);
  };

  const handleBuyNow = (id, amount) => {
    // const decode = btoa(id);
    const size = selectedSizes[id];
    if (!size) {
      handleError("⚠ Please select a size before adding to cart!");
      return;
    }

    navigate(`/all/address/${id}/${amount}/${size}`);
  };

  const handleCartItem = async (id) => {
    const size = selectedSizes[id];
    if (!size) {
      handleError("⚠ Please select a size before adding to cart!");
      return;
    }

    try {
      const result = await addCartAPI(id, { size });
      const { success, message, error } = result;

      if (success) {
        handleSuccess(message);
        navigate("/cart");
      } else {
        handleError(message || error);
      }
    } catch (error) {
      handleError(error.message);
    }
  };

  return (
    <main className="container">
      <section className="pt-4">
        <div className="row">
          <div className="col-md-6"></div>
          <div className="col-md-6 text-end">
            <h5>{userName}</h5>
          </div>
        </div>

        {wishlist?.length === 0  && (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ height: "100vh" }}
          >
            <p className="fw-semibold text-center btn btn-danger py-2">No Wishlist Product Available</p>
          </div>
        )}
      </section>

      <section className="my-5">
        {wishlist?.length > 0 &&
          wishlist.map((curr) => (
            <div
              key={curr._id}
              className="card mb-3 shadow-sm"
              onClick={() => handleDetailsPage(curr.product._id)}
           style={{cursor: "pointer"}} >
              <div className="row align-items-center p-4">
                {/* Image + Buttons Section */}
                <div className="col-md-3 text-center">
                  <img
                    src={curr.product.images[0].url}
                    alt={curr.product.name}
                    className="img-fluid rounded"
                    style={{ maxHeight: "150px", objectFit: "cover" }}
                  />

                  {/* 👉 Size Selection Pills */}
                  <div className="mt-2">
                    {curr?.product?.size?.map((size, index) => (
                      <span
                        key={index}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedSizes((prev) => ({
                            ...prev,
                            [curr.product._id]:
                              prev[curr.product._id] === size ? null : size,
                          }));
                        }}
                        className={`badge rounded-pill mx-1 px-3 py-2 ${selectedSizes[curr.product._id] === size
                            ? "bg-dark text-white"
                            : "bg-light text-dark border"
                          }`}
                        style={{ cursor: "pointer" }}
                      >
                        {size}
                      </span>
                    ))}
                  </div>

                  {/* 👉 Buttons */}
                  <div className="mt-3 d-flex justify-content-center gap-2">
                    <button
                      className="btn btn-outline-primary btn-sm px-3"
                      // disabled={!selectedSizes[curr.product._id]}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCartItem(curr.product._id);
                      }}
                    >
                      🛒 Add
                    </button>
                    <button
                      className="btn btn-primary btn-sm px-3"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleBuyNow(curr.product._id, curr.product.price);
                      }}
                    >
                      ⚡ Buy
                    </button>
                  </div>
                </div>

                {/* Product Details Section */}
                <div className="col-md-9">
                  <div className="card-body">
                    <div className="d-flex flex-column flex-md-row justify-content-md-between align-items-md-center text-center text-md-start">
                      <h5 className="card-title mb-2 mb-md-0">
                        {curr.product.name.toUpperCase()}
                      </h5>
                      <p className="card-text fw-semibold text-primary mb-0">
                        ₹{curr.product.price}
                      </p>
                      <p>
                        <Delete
                          size={25}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteWishlist(curr.product._id);
                          }}
                          style={{ cursor: "pointer" }}
                        />
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

        <hr className="mt-5" />

        {wishlist?.length > 0 && (
          <div className="row my-2 align-items-center">
            <div className="col-6 col-md-4">
              <h6 className="mb-0">
                Total Product Count:{" "}
                <span className="fw-bold ms-1">{lengthWishlist}</span>
              </h6>
            </div>
            <div className="col-6 col-md-8 text-end">
              <h6 className="mb-0">
                Total Amount: <span className="fw-bold ms-1">₹{amount}</span>
              </h6>
            </div>
            <ToastContainer />
          </div>
        )}

      </section>
    </main>
  );
};
