import React, { useEffect, useState } from "react";
import { allProductContext } from "../../context/ProductContext/FetchContext";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

export const Brands = () => {

  const { brand, brandError, fetchBrand } = allProductContext();

  const navigate = useNavigate();

  // useEffect(() => {
  //   document.title = "Brand-Page"
  // }, [])

  useEffect(() => {
    fetchBrand();
  }, []);

  // Some pleasant card background colors
  const colors = [
    "#fef9c3", // soft yellow
    "#d1fae5", // mint green
    "#e0f2fe", // light blue
    "#fce7f3", // light pink
    "#ede9fe", // lavender
    "#fcd34d", // gold
    "#ffe4e6", // blush pink
    "#ccfbf1", // aqua mint
    "#fde68a", // warm amber
    "#e9d5ff", // soft violet
    "#d9f99d", // lime pastel
    "#bae6fd", // sky pastel
    "#fbcfe8", // rose pastel
  ];

  const handleNavigate = (brand) => {
    const encoded = btoa(brand);
    navigate(`/brands/${encoded}`)
  }

  return (
    <>
      <Helmet>
        <title>Brands | Apna Shop</title>
        <meta
          name="description"
          content={`Explore the latest products Brands at Apna Shop. Get the best deals and offers today!`}
        />
        <meta
          name="keywords"
          content={`Brand products, Apna Shop online shopping`}
        />
      </Helmet>
      <main className="container my-5">
        <section className="text-center">

          {!brandError && <h2 className="p-2" style={{ color: "teal" }}>
            All Brands that are currently available in Our WareHouse...
          </h2>}

          <hr className="border border-1 border-dark" />

          <div className="row my-5">
            {brand.length > 0 && brand.map((curr, index) => (
              <div className="col-12 col-md-6 col-lg-3 my-3" key={index} onClick={() => handleNavigate(curr)}>
                <div
                  className="card shadow-sm border-0 rounded-3 d-flex justify-content-center align-items-center text-center p-4"
                  style={{
                    height: "200px",
                    backgroundColor: colors[index % colors.length],
                    fontWeight: "bold",
                    fontSize: "1.2rem",
                    color: "#1b1a1dff",
                    cursor: "pointer"
                  }}
                >
                  {curr}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
};
