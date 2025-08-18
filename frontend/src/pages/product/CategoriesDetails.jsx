import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { allProductContext } from "../../context/ProductContext/FetchContext";

export const CategoriesDetails = () => {
  const navigate = useNavigate();

  const { categoryDetails, categoryDetailsError, fetchCategoryDetails } =
    allProductContext();

  const { category } = useParams();

  let decode = "";

  if (category) {
    decode = atob(category);
  }

  // console.log(decode)

  useEffect(() => {
    fetchCategoryDetails(decode);
  }, []);

  // console.log(categoryDetails)

  const handleToNavigate = (id) => {
    const decode = btoa(id);
    navigate(`/product/details/${decode}`);
  };

  return (
    <>
      <main className="container">
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

        <section className="my-5 py-5">
          <h2 className="text-success text-center">
            Explore our {decode} Collection.
          </h2>
          <hr className="border border-1 border-dark my-4" />
          <div className="row">
            {categoryDetails.map((curr) => (
              <div className="col-12 col-md-6 col-lg-3 mb-4" key={curr._id} onClick={() => handleToNavigate(curr._id)}>
                <div className="card ">
                  <img
                    src={curr.images[0].url}
                    className="card-img-top img-fluid"
                    alt={curr.name}
                  />
                  <div className="card-body">
                    <p className="card-text text-center">
                      <span className="fw-bold">{curr.name}</span>
                    </p>
                    <p className="card-text text-center">
                      <span className="fw-bold">Brand: {curr.brandName}</span>
                    </p>

                    <p className="card-text text-center">
                      <span className="fw-bold">Price: {curr.price}</span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
};
