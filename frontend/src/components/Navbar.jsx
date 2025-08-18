import React, { useEffect } from "react";
import { Heart } from "lucide-react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { allWishlistContext } from "../context/WithlistContext/FetchAllWishlist";
import "./Navbar.css";
import { AllCartContextCustomHooks } from "../context/CartContext/AllCartContext";
import { handleError } from "../toastMessage/errorMessage";
import { handleLogoutAPI } from "../API/AuthenticationAPI/logout";
import { handleSuccess } from "../toastMessage/successMessage";
import { allAuthContext } from "../context/AuthContext/AuthContext";

export const Navbar = () => {
  const navigate = useNavigate();

  const { lengthWishlist, fetchWishlist } = allWishlistContext();
  const { totalcartItems, fetchAllCart } = AllCartContextCustomHooks();
  const { removeDataFromLocalStorage } = allAuthContext();

  const name = localStorage.getItem("name");

  useEffect(() => {
    fetchWishlist();
  }, []);

  useEffect(() => {
    fetchAllCart();
  }, []);

  const handleLogout = async () => {
    try {
      const result = await handleLogoutAPI();

      const { success, message, error } = result;

      if (success) {
        removeDataFromLocalStorage();
        handleSuccess(message);
        setTimeout(() => {
          navigate("/logout");
        }, 3000);
      }
    } catch (error) {
      handleError(error.message);
    }
  };
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm fixed-top">
        <div className="container-fluid container">
          {/* Brand Logo */}
          <NavLink className="navbar-brand fw-bold fs-4 text-warning" to="/">
            🛍️ Apna Shop
          </NavLink>

          {/* Mobile toggle */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Nav Items */}
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul
              className="navbar-nav me-auto mb-2 mb-lg-0"
              style={{ marginLeft: "100px" }}
            >
              <li className="nav-item">
                <NavLink className="nav-link" to="/categories">
                  Categories
                </NavLink>
              </li>
              <li className="nav-item ps-4">
                <NavLink className="nav-link" to="/brands">
                  Brands
                </NavLink>
              </li>

              {/* Wishlist with Heart + Badge */}
              <li className="nav-item ps-4">
                <NavLink
                  className="nav-link position-relative d-flex align-items-center"
                  to="/wishlist"
                >
                  <Heart color="#ff4757" strokeWidth={2.5} className="me-1" />
                  Wishlist
                  {lengthWishlist > 0 && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {lengthWishlist}
                    </span>
                  )}
                </NavLink>
              </li>

              <li className="nav-item ps-4">
                <NavLink
                  className="nav-link position-relative d-flex align-items-cente"
                  to="/cart"
                >
                  🛒 Cart
                  {totalcartItems > 0 && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {totalcartItems}
                    </span>
                  )}
                </NavLink>
              </li>
            </ul>

            {/* Dropdown Account */}
            <div className="dropdown">
              <button
                className="btn btn-warning dropdown-toggle px-3 fw-semibold"
                type="button"
                id="userDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Account
              </button>
              <ul
                className="dropdown-menu dropdown-menu-end shadow"
                aria-labelledby="userDropdown"
              >
                {!name && (
                  <>
                    <li>
                      <Link className="dropdown-item" to="/login">
                        Login
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/signup">
                        Signup
                      </Link>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                  </>
                )}
                {name && (
                  <li>
                    <button
                      className="dropdown-item text-danger"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};
