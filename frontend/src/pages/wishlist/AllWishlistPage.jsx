import React, { useEffect } from "react";
import { allAuthContext } from "../../context/AuthContext/AuthContext";
import { Delete } from "lucide-react";
import { allWishlistContext } from "../../context/WithlistContext/FetchAllWishlist";
import { handleError } from "../../toastMessage/errorMessage";
import { deleteWishlist } from "../../API/wishlist/deleteWishlist";
import { handleSuccess } from "../../toastMessage/successMessage";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const AllWishlistPage = () => {
  const navigate = useNavigate();
  const { fetchDetailsFromLocalStorage, userName } = allAuthContext();

  const { wishlist, wishlistError, lengthWishlist, amount, fetchWishlist } =
    allWishlistContext();

  useEffect(() => {
    fetchDetailsFromLocalStorage();
    fetchWishlist();
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

  return (
    <main className="my-2 container py-5">
      <section className="pt-4">
        <div className="row">
          <div className="col-md-6"></div>
          <div className="col-md-6 text-end">
            <h5>{userName}</h5>
          </div>
        </div>

        {wishlistError && (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ height: "100vh" }}
          >
            <p className="fw-semibold text-center">{wishlistError}</p>
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
            >
              <div className="row align-items-center p-4">
                <div className="col-md-3 text-center">
                  <img
                    src={curr.product.images[0].url}
                    alt={curr.product.name}
                    className="img-fluid rounded"
                    style={{ maxHeight: "100px", objectFit: "cover" }}
                  />
                </div>

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

        <hr className="mt-5"/>

        {wishlist?.length > 0 && (
          <div className="row my-2">
            <div className="col-md-4">
              <h5>
                Total Product Count:{" "}
                <span className="ms-2">{lengthWishlist}</span>
              </h5>
            </div>
            <div className="col-md-8 text-end">
              <h5>
                Total Amount: <span className="ms-2">₹{amount}</span>
              </h5>
            </div>
            <ToastContainer />
          </div>
        )}
      </section>
    </main>
  );
};
