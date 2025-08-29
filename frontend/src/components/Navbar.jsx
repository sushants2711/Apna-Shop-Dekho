import React, { useEffect } from "react";
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

  useEffect(() => {
    fetchWishlist();
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
  };

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm p-3">
        <div className="container-fluid container">
          {/* Brand Logo */}
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
              {/* Products */}
              <li className="nav-item text-end">
                <NavLink className="nav-link" to="/" onClick={handleNavLinkClick}>
                  Products
                </NavLink>
              </li>

              <li className="nav-item ps-4 text-end">
                <NavLink className="nav-link" to="/categories" onClick={handleNavLinkClick}>
                  Categories
                </NavLink>
              </li>

              <li className="nav-item ps-4 text-end">
                <NavLink className="nav-link" to="/brands" onClick={handleNavLinkClick}>
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
                  <Heart color="#ff4757" strokeWidth={2.5} className="me-1" />
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

              {/* Orders */}
              <li className="nav-item dropdown ps-4 text-end">
                <div className="dropdown">
                  <button
                    className="btn btn-warning fw-semibold dropdown-toggle w-100"
                    id="accountDropdown"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Account
                  </button>
                  <ul className="dropdown-menu bg-dark" aria-labelledby="accountDropdown">

                    <li>
                      <Link className="dropdown-item text-light" to="/user/profile" onClick={handleNavLinkClick}>Profile</Link>
                    </li>

                    {!name ? (
                      <>
                        <li>
                          <Link className="dropdown-item text-light" to="/login" onClick={handleNavLinkClick}>
                            Login
                          </Link>
                        </li>
                        <li>
                          <Link className="dropdown-item text-light" to="/signup" onClick={handleNavLinkClick}>
                            Signup
                          </Link>
                        </li>
                      </>
                    ) : (
                      <li>
                        <button className="dropdown-item text-light" onClick={handleLogout}>
                          Logout
                        </button>
                      </li>
                    )}
                  </ul>
                </div>
              </li>

            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};
