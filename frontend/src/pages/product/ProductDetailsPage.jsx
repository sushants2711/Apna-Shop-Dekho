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

  const { fetchWishlist, wishlist } = allWishlistContext();

  useEffect(() => {
    document.title = "Product-Details-Page"
  }, []);

  const [product, setProduct] = useState({});
  const [error, setError] = useState("");
  const [mainImage, setMainImage] = useState([]);
  const [isWishlisted, setIsWishlisted] = useState(false);

  // ✅ Track selected size
  const [selectedSize, setSelectedSize] = useState("");

  let decode = "";
  if (id) {
    decode = atob(id);
  }

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
  }, []);

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

  // ✅ Add to Cart with size
  const handleCartItem = async (id) => {
    if (!selectedSize) {
      handleError("⚠ Please select a size before adding to cart!");
      return;
    }

    try {
      const result = await addCartAPI(id, { size: selectedSize });
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

  const handleBuyNow = (id, amount) => {
    const size = selectedSize;

    // console.log(size)
    if (!size) {
      return handleError("Please select a size before proceeding to Buy Now!");
    }

    navigate(`/all/address/${id}/${amount}/${size}`);
  };

  return (
    <>
      <main className="container my-5">
        <section>
          <div className="row">
            <div className="col-md-6">
              {mainImage && (
                <div
                  style={{
                    width: "90%",
                    height: "500px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "8px",
                    position: "relative",
                    backgroundColor: "#f9f9f9",
                    overflow: "hidden",
                    margin: "0 auto",
                  }}
                  className="mb-3"
                >
                  <img
                    src={mainImage}
                    alt="main"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                  />

                  {/* Heart button */}
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

              {/* Thumbnail images */}
              <div className="d-flex justify-content-center gap-2 flex-wrap mt-3">
                {product?.images?.map((curr) => (
                  <img
                    key={curr._id}
                    src={curr.url}
                    alt="thumbnail"
                    className={`rounded border ${
                      mainImage === curr.url ? "border-primary border-3" : ""
                    }`}
                    style={{
                      width: "60px",
                      height: "60px",
                      objectFit: "cover",
                      cursor: "pointer",
                    }}
                    onClick={() => setMainImage(curr.url)}
                  />
                ))}
              </div>
            </div>

            {/* Right side product info */}
            <div className="col-md-6">
              <h2 className="mb-3 mt-5 pt-4 mt-md-0 pt-md-0 ">
                {product?.name}
              </h2>
              <p>Rating: {"⭐".repeat(product?.rating || 3)}</p>
              <hr />

              <h4 className="text-primary mb-3 mt-4">
                <span className="text-dark me-2">Price: </span>₹{product?.price}
              </h4>

              <p>{product?.description}</p>
              <p className="fw-semibold">Category: {product?.category}</p>
              <p className="fw-semibold">Brand: {product?.brandName}</p>

              {/* ✅ Size Selection with Dropdown */}
              <div className="my-3">
                <label className="block text-sm font-semibold mb-1">
                  Select Size:
                </label>
                <select
                  value={selectedSize}
                  onChange={(e) => setSelectedSize(e.target.value)}
                  className="px-2 py-2 border rounded w-48 cursor-pointer bg-white text-sm"
                >
                  <option value="">-- Select Size --</option>
                  {product?.size?.map((size, index) => (
                    <option key={index} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </div>

              <p className="fw-semibold my-3">
                {product?.bestSeller ? "BestSeller: true" : ""}
              </p>
              <p className="fw-semibold">
                {product?.stock > 0 ? "Stock: Available" : ""}
              </p>
              <hr />

              {/* Highlights */}
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

              {/* Extra details */}
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

              {/* Add to Cart + Buy Now */}
              <div className="my-5 pt-3">
                <button
                  className="btn btn-danger me-5 px-3 border border-1 border-black p-2"
                  onClick={() => handleCartItem(product._id)}
                >
                  Add to Cart
                </button>
                <button
                  className="btn btn-primary px-4 border border-1 border-black p-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleBuyNow(product._id, product.price);
                  }}
                >
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
