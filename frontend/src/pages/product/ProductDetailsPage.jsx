import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { allProductDetails } from "../../API/ProductAPI/allProductDetails";
import { Heart } from "lucide-react";
import { toggleWishlistAPi } from "../../API/wishlist/toggleWishlist";
import { handleSuccess } from "../../toastMessage/successMessage";
import { handleError } from "../../toastMessage/errorMessage";
import { ToastContainer } from "react-toastify";
import { allWishlistContext } from "../../context/WithlistContext/FetchAllWishlist";
import { addCartAPI } from "../../API/CartApi/addCart";

export const ProductDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // console.log(id)

  const { fetchWishlist, wishlist } = allWishlistContext();

  const [product, setProduct] = useState({});
  const [error, setError] = useState("");

  const [mainImage, setMainImage] = useState([]);

  const [isWishlisted, setIsWishlisted] = useState(false);

  let decode = "";

  if (id) {
    decode = atob(id);
  }

  // console.log(decode);

  const fetchTheDetails = async () => {
    try {
      const result = await allProductDetails(decode);
      const { success, message, error, data } = result;

      if (success) {
        setProduct(data);
        setMainImage(data?.images[0]?.url);
      } else {
        setError(message || error);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    if (wishlist?.some((item) => item.product._id === decode)) {
      setIsWishlisted(true);
    } else {
      setIsWishlisted(false);
    }
  }, [wishlist, decode]);

  useEffect(() => {
    fetchTheDetails();
    // window.scrollTo(0, 0);
  }, []);

  // console.log(product);
  // console.log("main images", mainImage);

  const handleToggleWishlist = async (id) => {
    try {
      const result = await toggleWishlistAPi(id);
      const { success, message, error } = result;

      if (success) {
        handleSuccess(message);
        fetchWishlist();
        setIsWishlisted(!isWishlisted);
      } else {
        handleError(message || error);
      }
    } catch (error) {
      handleError(error.message);
    }
  };

  const handleCartItem = async (id) => {
    const result = await addCartAPI(id);

    const { success, message, error } = result;

    if (success) {
      handleSuccess(message);
    } else {
      handleError(message || error);
    }
  };

  const handleBuyNow = (id) => {
    const decode = btoa(id);
    navigate(`/all/address/${decode}`);
  };

  return (
    <>
      <main className="container my-5">
        <section className="">
          <div className="row">
            <div className="col-md-6">
              {mainImage && (
                <div
                  style={{
                    width: "90%", // container full width
                    height: "550px", // fixed height for main image
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "8px",
                    position: "relative",
                    backgroundColor: "#f9f9f9", // optional, adds neutral bg
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={mainImage}
                    alt="main"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover", // ✅ fits image properly
                      borderRadius: "8px",
                    }}
                  />

                  {/* Heart stays absolute */}
                  <Heart
                    size={35}
                    fill={isWishlisted ? "red" : "white"}
                    color="black"
                    style={{
                      position: "absolute",
                      top: "20px",
                      right: "20px",
                      cursor: "pointer",
                      backgroundColor: "rgba(255,255,255,0.8)",
                      borderRadius: "50%",
                      padding: "6px",
                      boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                    }}
                    onClick={() => handleToggleWishlist(product._id)}
                  />
                </div>
              )}

              <div className="d-flex justify-content-center gap-2 flex-wrap mt-3">
                {product?.images?.map((curr) => (
                  <img
                    key={curr._id}
                    src={curr.url}
                    alt="thumbnail"
                    className={`rounded border ${mainImage === curr.url
                        ? "border-primary border-3"
                        : "border-0"
                      }`}
                    style={{
                      width: "60px",
                      height: "60px",
                      objectFit: "cover",
                      cursor: "pointer",
                      backgroundColor:
                        mainImage === curr.url ? "#f0f8ff" : "transparent",
                    }}
                    onClick={() => setMainImage(curr.url)}
                  />
                ))}
              </div>
            </div>
            <div className="col-md-6">
              <h2 className="mb-3 mt-5 pt-4 mt-md-0 pt-md-0 ">
                {product?.name}
              </h2>

              <hr />
              <h4 className="text-primary mb-3 mt-4">
                <span className="text-dark me-2">Price: </span>₹{product?.price}
              </h4>
              <p className="">{product?.description}</p>
              <p className="fw-semibold">Category: {product?.category}</p>
              <p className="fw-semibold">Brand: {product?.brandName}</p>
              <div className="flex gap-2">
                {product?.size?.map((size, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 border rounded bg-gray-100 text-gray-800 text-sm font-semibold"
                  >
                    {size}
                  </span>
                ))}
              </div>

              <p className="fw-semibold my-3">
                {product?.bestSeller ? "BestSeller: true" : ""}
              </p>
              <p className="fw-semibold">
                {product?.stock > 0 ? "Stock: Available" : ""}
              </p>
              <hr />
              <div>
                <h5>Product Highlights</h5>

                {product?.highlights?.map((curr) => (
                  <details key={curr._id} className="mb-2">
                    <summary>Details</summary>
                    <p className="mt-2">
                      {curr.title} - {curr.description}
                    </p>
                  </details>
                ))}
              </div>

              <hr />

              <div>
                <h5>Extra Details</h5>
                {product?.productDetails?.map((curr) => (
                  <details key={curr._id} className="mb-2">
                    <summary>Details</summary>
                    <p>
                      {curr.title} - {curr.description}
                    </p>
                  </details>
                ))}
              </div>

              <hr />

              <div>
                <details>
                  <summary>Return Policy</summary>
                  <p className="mt-2">{product.returnPolicy}</p>
                </details>
              </div>

              <div className="mt-4">
                <p>SellerName: {product.sellerName}</p>
              </div>

              <div className="my-5 pt-3">
                <button
                  className="btn btn-danger me-5 px-3 border border-1 border-black p-2"
                  onClick={() => handleCartItem(product._id)}
                >
                  Add to Cart
                </button>
                <button className="btn btn-primary px-4 border border-1 border-black p-2" onClick={(e) => {
                  e.stopPropagation();
                  handleBuyNow(product._id)
                }}>
                  Buy Now
                </button>
              </div>
            </div>
            <ToastContainer />
          </div>
        </section>
      </main>
    </>
  );
};
