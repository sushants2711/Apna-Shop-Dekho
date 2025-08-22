import React, { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import "./Navbar.css";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { allWishlistContext } from "../context/WithlistContext/FetchAllWishlist";
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

  const [showAccountMenu, setShowAccountMenu] = useState(false);

  useEffect(() => {
    fetchWishlist();
  }, []);

  useEffect(() => {
    fetchAllCart();
  }, []);

  const handleLogout = async () => {
    try {
      const result = await handleLogoutAPI();
      const { success, message } = result;

      if (success) {
        removeDataFromLocalStorage();
        handleSuccess(message);
        setTimeout(() => {
          navigate("/logout");
        }, 2000);
      }
    } catch (error) {
      handleError(error.message);
    }
  };

  const handleNavLinkClick = () => {
    const navbarCollapse = document.getElementById("navbarSupportedContent");
    if (navbarCollapse && navbarCollapse.classList.contains("show")) {
      window.bootstrap.Collapse.getInstance(navbarCollapse)?.hide();
    }
    setShowAccountMenu(false);
  };

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm p-3">
        <div className="container-fluid container">
          {/* Brand Logo (just text now, no link) */}
          <span className="navbar-brand fw-bold fs-4 text-warning">
            🛍️ Apna Shop
          </span>

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
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              {/* ✅ Products Link Added */}
              <li className="nav-item text-end">
                <NavLink
                  className="nav-link"
                  to="/"
                  onClick={handleNavLinkClick}
                >
                  Products
                </NavLink>
              </li>

              <li className="nav-item ps-4 text-end">
                <NavLink
                  className="nav-link"
                  to="/categories"
                  onClick={handleNavLinkClick}
                >
                  Categories
                </NavLink>
              </li>
              <li className="nav-item ps-4 text-end">
                <NavLink
                  className="nav-link"
                  to="/brands"
                  onClick={handleNavLinkClick}
                >
                  Brands
                </NavLink>
              </li>

              {/* Wishlist */}
              <li className="nav-item ps-4 text-end">
                <NavLink
                  className="nav-link position-relative d-flex align-items-center justify-content-end"
                  to="/wishlist"
                  onClick={handleNavLinkClick}
                >
                  <Heart
                    color="#ff4757"
                    strokeWidth={2.5}
                    className="me-1 text-end"
                  />
                  Wishlist
                  {lengthWishlist > 0 && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {lengthWishlist}
                    </span>
                  )}
                </NavLink>
              </li>

              {/* Cart */}
              <li className="nav-item ps-4 text-end">
                <NavLink
                  className="nav-link position-relative d-flex align-items-center justify-content-end"
                  to="/cart"
                  onClick={handleNavLinkClick}
                >
                  🛒 Cart
                  {totalcartItems > 0 && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {totalcartItems}
                    </span>
                  )}
                </NavLink>
              </li>

              {/* Account */}
              <li className="nav-item ps-4 text-end">
                <button
                  className="btn btn-warning fw-semibold"
                  onClick={() => setShowAccountMenu(!showAccountMenu)}
                >
                  Account
                </button>
              </li>

              {/* Account Menu */}
              {showAccountMenu && (
                <>
                  {!name && (
                    <>
                      <li className="nav-item ps-3 text-end">
                        <Link
                          className="nav-link"
                          to="/login"
                          onClick={handleNavLinkClick}
                        >
                          Login
                        </Link>
                      </li>
                      <li className="nav-item ps-3 text-end">
                        <Link
                          className="nav-link"
                          to="/signup"
                          onClick={handleNavLinkClick}
                        >
                          Signup
                        </Link>
                      </li>
                    </>
                  )}
                  {name && (
                    <li className="nav-item ps-3 text-end">
                      <button
                        className="nav-link text-danger btn btn-link"
                        onClick={() => {
                          handleLogout();
                          handleNavLinkClick();
                        }}
                      >
                        Logout
                      </button>
                    </li>
                  )}
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};
