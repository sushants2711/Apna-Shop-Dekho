import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import App from "./App.jsx";
import { FetchContextProvider } from "./context/ProductContext/FetchContext.jsx";
import { AuthContextProvider } from "./context/AuthContext/AuthContext.jsx";
import { FetchAllWishlistProvider } from "./context/WithlistContext/FetchAllWishlist.jsx";
import { AllCartContextProvider } from "./context/CartContext/AllCartContext.jsx";
import { AddressContextProvider } from "./context/AddressContext/AddressContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <AllCartContextProvider>
          <FetchAllWishlistProvider>
            <FetchContextProvider>
              <AddressContextProvider>
                <App />
              </AddressContextProvider>
            </FetchContextProvider>
          </FetchAllWishlistProvider>
        </AllCartContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </StrictMode>
);
