import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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

  console.log(decode)

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

  // console.log(product);
  // console.log("main images", mainImage);

  const handleToggleWishlist = async (id) => {
    try {
      const result = await toggleWishlistAPi(id);
      const { success, message, error } = result;

      if (success) {
        handleSuccess(message);
        fetchWishlist()
        setIsWishlisted(!isWishlisted)
      } else {
        handleError(message || error);
      }
    } catch (error) {
      handleError(error.message)
    }
  }

  const handleCartItem = async (id) => {
    const result = await addCartAPI(id);

    const { success, message, error } = result;

    if (success) {
      handleSuccess(message);
    } else {
      handleError(message || error);
    };
  };

  return (
    <>
      <main className="container my-5">
        <section className="py-4 py-md-5">
          <div className="row py-md-5">
            <div className="col-md-6">
              {mainImage && (
                <div
                  style={{
                    width: "90%",
                    height: "550px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "8px",
                  }}
                >
                  <img
                    src={mainImage}
                    alt="main"
                    style={{
                      maxWidth: "100%",
                      maxHeight: "100%",
                      objectFit: "contain",
                      borderRadius: "8px",
                    }}
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
              <h2 className="mb-3 mt-5 pt-4 mt-md-0 pt-md-0 ">{product?.name}</h2>

              <Heart size={40} className="mb-2" fill={isWishlisted ? "red" : "none"} onClick={() => handleToggleWishlist(product._id)} />

              <hr />
              <h4 className="text-primary mb-3 mt-4">
                <span className="text-dark me-2">Price: </span>₹{product?.price}
              </h4>
              <p className="">{product?.description}</p>
              <p className="fw-semibold">{product?.category}</p>
              <p className="fw-semibold">{product?.brandName}</p>
              <p className="fw-semibold">Size: [{product?.size?.join(" ")}]</p>
              <p className="fw-semibold">
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
                <button className="btn btn-danger me-5 px-3 border border-1 border-black p-2" onClick={() => handleCartItem(product._id)}>Add to Cart</button>
                <button className="btn btn-primary px-4 border border-1 border-black p-2">Buy Now</button>
              </div>
            </div>
            <ToastContainer />
          </div>
        </section>
      </main>
    </>
  );
};
