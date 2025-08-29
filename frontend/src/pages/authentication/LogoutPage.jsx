import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export const LogoutPage = () => {

    useEffect(() => {
      document.title = "Logout-Page"
    })
  return (
    <div className="container d-flex flex-column justify-content-center align-items-center vh-100">
      <div className="card shadow-lg text-center p-5" style={{ maxWidth: "500px" }}>
        <h2 className="mb-3 text-danger">👋 You’ve Logged Out</h2>
        <p className="text-muted">
          Thank you for shopping with <strong>Apna Shop</strong> 🛒 <br />
          We hope you enjoyed your shopping experience.
        </p>
        <h5 className="mt-3 text-success">We’ll be happy to welcome you again soon! 💖</h5>
        <a href="/login" className="btn btn-primary mt-4">
          Login Again
        </a>
      </div>
    </div>
  );
};
