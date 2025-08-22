import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { allProductContext } from "../../context/ProductContext/FetchContext";
import { Heart } from "lucide-react";
import { allWishlistContext } from "../../context/WithlistContext/FetchAllWishlist";
import { toggleWishlistAPi } from "../../API/wishlist/toggleWishlist";
import { addCartAPI } from "../../API/CartApi/addCart";
import { handleSuccess } from "../../toastMessage/successMessage";
import { handleError } from "../../toastMessage/errorMessage";
import { ToastContainer } from "react-toastify";
import { categorySortApi } from "../../API/ProductAPI/categorySortApi";

export const CategoriesDetails = () => {
  const navigate = useNavigate();
  const { fetchWishlist, wishlist } = allWishlistContext();
  const { categoryDetails, categoryDetailsError, fetchCategoryDetails, setCategoryDetails } =
    allProductContext();
  const { category } = useParams();

  const [search, setSearch] = useState("");

  let decode = "";
  if (category) {
    decode = atob(category);
  }

  useEffect(() => {
    fetchCategoryDetails(decode);
  }, []);

  // Wishlist handler
  const handleToggleWishlist = async (id) => {
    try {
      const result = await toggleWishlistAPi(id);
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

  // Cart handler
  const handleCartItem = async (id) => {
    try {
      const result = await addCartAPI(id);
      const { success, message, error } = result;

      if (success) {
        handleSuccess(message);
      } else {
        handleError(message || error);
      }
    } catch (error) {
      handleError(error.message);
    }
  };

  // Navigate to details page
  const handleToNavigate = (id) => {
    const encode = btoa(id);
    navigate(`/product/details/${encode}`);
  };

  const handleSort = async (e) => {
    const value = e.target.value;
    const result = await categorySortApi(decode, value)

    const { success, message, error, data } = result;
    if (success) {
      setCategoryDetails(data)
    };
  };

  const filteredProducts = categoryDetails.filter((p) => {
    const searchLower = search.toLowerCase();
    return p.name.toLowerCase().includes(searchLower);
  });


  return (
    <>
      <main className="container my-5">
        {categoryDetailsError && (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ height: "100vh" }}
          >
            <div className="fw-semibold text-center fs-5">
              {categoryDetailsError}
            </div>
          </div>
        )}

        <section className="my-5 py-3">
          <h2 className="text-success text-center mb-4">
            Explore our {decode} Collection
          </h2>
          <hr className="border border-1 border-dark my-4" />

          <div className="col-12 col-md-6 mx-auto my-3 p-2">
            <input
              type="text"
              className="form-control search-box"
              placeholder="🔍 Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="my-4 col-12 col-md-3">
            <label htmlFor="sort" className="form-label fw-semibold fs-5">
              Sort By Price
            </label>
            <select
              id="sort"
              className="form-control sort-dropdown"
              onChange={handleSort}
            >
              <option value="" disabled selected>
                -- Select any Value --
              </option>
              <option value="asc">Ascending Order</option>
              <option value="dsc">Descending Order</option>
            </select>
          </div>

          <div className="row">
            {filteredProducts.map((curr) => {
              const isWishlisted = wishlist?.some(
                (item) => item.product._id === curr._id
              );

              const handleToGetAddress = (id) => {
                const decode = btoa(id);
                navigate(`/all/address/${decode}`)
              }

              return (
                <div className="col-12 col-md-6 col-lg-3 mb-4" key={curr._id}>
                  <div className="card h-100 shadow-sm border-0">
                    {/* Image Box */}
                    <div
                      style={{
                        width: "100%",
                        height: "280px",
                        position: "relative",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "#f9f9f9",
                        borderRadius: "8px",
                        overflow: "hidden",
                        cursor: "pointer",
                      }}
                      onClick={() => handleToNavigate(curr._id)}
                    >
                      <img
                        src={curr.images[0]?.url}
                        alt={curr.name}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "contain",
                        }}
                      />

                      {/* Wishlist Heart */}
                      <Heart
                        size={28}
                        fill={isWishlisted ? "red" : "white"}
                        color="black"
                        style={{
                          position: "absolute",
                          top: "12px",
                          right: "12px",
                          cursor: "pointer",
                          backgroundColor: "rgba(255,255,255,0.8)",
                          borderRadius: "50%",
                          padding: "5px",
                          boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleWishlist(curr._id);
                        }}
                      />
                    </div>

                    {/* Card Body */}
                    <div className="card-body text-center">
                      <p className="fw-bold fs-6">{curr.name}</p>
                      <p className="mb-1">Brand: {curr.brandName}</p>
                      <p className="text-primary fw-bold">₹{curr.price}</p>

                      {/* Buttons */}
                      <div className="d-flex justify-content-center gap-2 mt-3">
                        <button
                          className="btn btn-danger px-3 border border-1 border-black"
                          onClick={() => handleCartItem(curr._id)}
                        >
                          Add to Cart
                        </button>
                        <button
                          className="btn btn-primary px-3 border border-1 border-black"
                          onClick={() => handleToGetAddress(curr._id)}
                        >
                          Buy Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
        <ToastContainer />
      </main>
    </>
  );
};
