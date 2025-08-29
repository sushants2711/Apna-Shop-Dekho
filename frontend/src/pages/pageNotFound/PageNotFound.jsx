import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const PageNotFound = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "PageNotFound"
  },[]);

  return (
    <main className="d-flex flex-column justify-content-center align-items-center vh-100 text-center">
      <h1 className="display-4 fw-bold text-danger">404</h1>
      <p className="fs-4 mb-4">Oops! Page Not Found</p>

      <div className="d-flex gap-3">
        {/* Go Back Button */}
        <button 
          className="btn btn-outline-secondary"
          onClick={() => navigate(-1)}
        >
          ← Previous Page
        </button>

        {/* Go Home Link */}
        <Link to="/" className="btn btn-primary px-4">
          Home Page
        </Link>
      </div>
    </main>
  );
};
