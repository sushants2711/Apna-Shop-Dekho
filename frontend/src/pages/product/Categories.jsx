import React, { useEffect, useState } from "react";
import { allProductContext } from "../../context/ProductContext/FetchContext";
import { useNavigate } from "react-router-dom";

export const Categories = () => {
  const { category, categoryError, fetchCategory } = allProductContext();

  const navigate = useNavigate();
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

useEffect(() => {
  document.title = "Categories-page"
}, []);

  useEffect(() => {
    fetchCategory();
  }, [])

  const handleNavigate = (category) => {
    const encoded = btoa(category);
    navigate(`/categories/${encoded}`)
  };

  return (
    <>
      <main className="container my-5">
        {categoryError && (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ height: "100vh" }}
          >
            <div className="fw-semibold text-center fs-5">{categoryError}</div>
          </div>
        )}
        <section className="my-4">
          {!categoryError && (
            <h2 className="text-center p-2" style={{ color: "teal" }}>
              All Collections Currently Available in Our Apna Shop...
            </h2>
          )}
          <hr className="border border-1 border-dark" />

          <div className="row g-4 my-3">
            {category.map((curr, index) => (
              <div className="col-12 col-md-6 col-lg-3 my-3" key={curr} onClick={() => handleNavigate(curr)}>
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
