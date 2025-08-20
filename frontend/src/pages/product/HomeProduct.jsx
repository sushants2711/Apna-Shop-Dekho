// import React, { useEffect } from "react";
// import { allProductContext } from "../../context/ProductContext/FetchContext";
// import { sortApi } from "../../API/ProductAPI/sort.home";
// import { useNavigate } from "react-router-dom";

// export const HomeProduct = () => {

//   const navigate = useNavigate();

//   const {
//     productData,
//     errMessage,
//     fetchAlways,
//     setProductData,
//     setErrMessage,
//     bestSeller,
//     bestSellerError,
//     fetchBestSeller
//   } = allProductContext();

//   useEffect(() => {
//     document.title = "Home-Page";
//   }, []);

//   useEffect(() => {
//     fetchAlways();
//   }, []);

//   const handleSort = async (e) => {
//     const value = e.target.value;

//     const result = await sortApi(value);

//     const { success, message, error, data } = result;

//     if (success) {
//       setProductData(data);
//     } else {
//       setErrMessage(message || error);
//     }
//   };

//   const handleToNavigate = (id) => {
//     const decode = btoa(id)
//     navigate(`/product/details/${decode}`);
//   }

//   return (
//     <>
//       <main className="container my-5 pt-3">
//         {errMessage && (
//           <div
//             className="d-flex justify-content-center align-items-center"
//             style={{ height: "100vh" }}
//           >
//             <div className="fw-semibold text-center fs-5">{errMessage}</div>
//           </div>
//         )}

//         {productData.length > 0 && (
//           <div className="my-4 col-12 col-md-3">
//             <label htmlFor="sort" className="form-label fw-semibold fs-5">
//               Sort By Price
//             </label>
//             <select id="sort" className="form-control" onChange={handleSort}>
//               <option value="" disabled selected>
//                 -- Select any Value --
//               </option>
//               <option value="asc">Ascending Order</option>
//               <option value="dsc">Descending Order</option>
//             </select>
//           </div>
//         )}
//         <section className="py-3">
//           <div className="row">
//             {productData.map((curr) => (
//               <div className="col-12 col-md-6 col-lg-3 mb-4" key={curr._id} onClick={() => handleToNavigate(curr._id)}>
//                 <div className="card">
//                   <img
//                     src={curr.images[0].url}
//                     className="card-img-top img-fluid"
//                     alt={curr.name}
//                   />

//                   <div className="card-body">
//                     <p className="card-text text-center">
//                       <span className="fw-bold">{curr.name}</span>
//                     </p>
//                     <p className="card-text text-center">
//                       <span className="fw-bold">Brand: {curr.brandName}</span>
//                     </p>

//                     <p className="card-text text-center">
//                       <span className="fw-bold">Price: {curr.price}</span>
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </section>
//       </main>
//     </>
//   );
// };

import React, { useEffect, useState } from "react";
import { allProductContext } from "../../context/ProductContext/FetchContext";
import { sortApi } from "../../API/ProductAPI/sort.home";
import { useNavigate } from "react-router-dom";
import "./HomeProduct.css";
import { addCartAPI } from "../../API/CartApi/addCart";
import { handleSuccess } from "../../toastMessage/successMessage";
import { handleError } from "../../toastMessage/errorMessage";
import { ToastContainer } from "react-toastify";

export const HomeProduct = () => {
  const navigate = useNavigate();

  const {
    productData,
    errMessage,
    fetchAlways,
    setProductData,
    setErrMessage,
    bestSeller,
    fetchBestSeller,
  } = allProductContext();

  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    document.title = "Home-Page";
  }, []);

  const fetchData = async () => {
    setLoading(true);
    await fetchAlways();
    await fetchBestSeller();
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSort = async (e) => {
    const value = e.target.value;
    const result = await sortApi(value);

    const { success, message, error, data } = result;

    if (success) {
      setProductData(data);
    } else {
      setErrMessage(message || error);
    }
  };

  const handleToNavigate = (id) => {
    const decode = btoa(id);
    navigate(`/product/details/${decode}`);
  };

  // 🔍 Filter products by search (name, brand, category)
  const filteredProducts = productData.filter((p) => {
    const searchLower = search.toLowerCase();
    return (
      p.name.toLowerCase().includes(searchLower) ||
      p.brandName.toLowerCase().includes(searchLower) ||
      (p.category && p.category.toLowerCase().includes(searchLower))
    );
  });

  const handleAddItemsToCart = async (id) => {
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

  return (
    <main className="container my-5">
      {/* Error message */}
      {errMessage && (
        <div className="d-flex justify-content-center align-items-center vh-50">
          <div className="fw-semibold text-center fs-5">{errMessage}</div>
        </div>
      )}

      {/* Loader */}
      {loading && !errMessage && (
        <div className="d-flex justify-content-center align-items-center vh-50">
          <div
            className="spinner-border text-primary loader-size"
            role="status"
          >
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}

      {/* Search Bar */}
      {!loading && productData.length > 0 && (
        <div className="col-12 col-md-6 mx-auto my-3 p-2">
          <input
            type="text"
            className="form-control search-box"
            placeholder="🔍 Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      )}

      {!loading && productData.length > 0 && (
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
      )}

      {/* ✅ Best Seller Carousel */}
      {!loading && bestSeller && bestSeller.length > 0 && (
        <section className="my-5">
          <h3 className="fw-bold text-center mb-4 section-title">
            🔥 Best Seller Products 🔥
          </h3>

          <div
            id="bestSellerCarousel"
            className="carousel slide"
            data-bs-ride="carousel"
          >
            {/* Indicators */}
            <div className="carousel-indicators">
              {bestSeller.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  data-bs-target="#bestSellerCarousel"
                  data-bs-slide-to={i}
                  className={i === 0 ? "active" : ""}
                  aria-current={i === 0}
                  aria-label={`Slide ${i + 1}`}
                ></button>
              ))}
            </div>

            {/* Carousel Items */}
            <div className="carousel-inner">
              {bestSeller.map((item, index) => (
                <div
                  className={`carousel-item ${index === 0 ? "active" : ""}`}
                  key={item._id}
                  onClick={() => handleToNavigate(item._id)}
                >
                  <img
                    src={item.images[0].url}
                    className="d-block w-100 carousel-img"
                    alt={item.name}
                  />
                  <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded-3 p-2">
                    <h5>{item.name}</h5>
                    <p>Brand: {item.brandName}</p>
                    <p className="fw-bold">₹{item.price}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Controls */}
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#bestSellerCarousel"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#bestSellerCarousel"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </section>
      )}

      {/* Empty State */}
      {!loading && filteredProducts.length === 0 && !errMessage && (
        <div className="text-center my-5">
          <h4>No products found 🚫</h4>
          <button className="btn btn-primary mt-3" onClick={fetchAlways}>
            Refresh Products
          </button>
        </div>
      )}

      {/* Normal Products */}
      {!loading && filteredProducts.length > 0 && (
        <section className="py-5">
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-5">
            {filteredProducts.map((curr) => (
              <div
                className="col"
                key={curr._id}
                onClick={() => handleToNavigate(curr._id)}
              >
                <div className="card product-card h-100 shadow-sm border-0">
                  <img
                    src={curr.images[0].url}
                    className="card-img-top product-img"
                    alt={curr.name}
                  />
                  <div className="card-body text-center">
                    <p className="card-text fw-bold">{curr.name}</p>
                    <p className="card-text">Brand: {curr.brandName}</p>
                    <p className="card-text fw-bold text-success">
                      ₹{curr.price}
                    </p>

                    <div className="d-flex gap-2 mt-2">
                      <button
                        className="btn btn-sm btn-success flex-fill"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddItemsToCart(curr._id);
                        }}
                      >
                        🛒 Add to Cart
                      </button>
                      <button className="btn btn-sm btn-primary flex-fill">
                        ⚡ Buy Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <ToastContainer />
        </section>
      )}
    </main>
  );
};
