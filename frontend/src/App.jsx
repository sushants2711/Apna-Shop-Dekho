import { Route, Routes } from "react-router-dom";

import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";

import { HomeProduct } from "./pages/product/HomeProduct";
import { Categories } from "./pages/product/Categories";
import { Brands } from "./pages/product/Brands";

import { CategoriesDetails } from "./pages/product/CategoriesDetails";
import { BrandDetails } from "./pages/product/BrandDetails";

import { ProductDetailsPage } from "./pages/product/ProductDetailsPage";
import { SignupPage } from "./pages/authentication/SignupPage";
import { LoginPage } from "./pages/authentication/LoginPage";
import { AllWishlistPage } from "./pages/wishlist/AllWishlistPage";
import { PublicRoute } from "./routes/PublicRoute";
import { PrivateRoute } from "./routes/PrivateRoute";
import { CartPage } from "./pages/cart/CartPage";
import { PageNotFound } from "./pages/pageNotFound/PageNotFound";
import { LogoutPage } from "./pages/authentication/LogoutPage";
import { ScrollToTop } from "./routes/ScrollToTop";
import { CreateAddress } from "./pages/address/CreateAddress";
import { GetAllAddress } from "./pages/address/GetAllAddress";
import { PaymentPage } from "./pages/payment/PaymentPage";

function App() {
  return (
    <>
      <Navbar />
      <ScrollToTop />
      <Routes>
        {/* After login this route is not working or not visible to user*/}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />

        <Route
          path="/signup"
          element={
            <PublicRoute>
              <SignupPage />
            </PublicRoute>
          }
        />

        <Route path="/" element={<HomeProduct />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/brands" element={<Brands />} />
        <Route path="/categories/:category" element={<CategoriesDetails />} />
        <Route path="/brands/:brand" element={<BrandDetails />} />
        <Route path="/product/details/:id" element={<ProductDetailsPage />} />

        {/* Without login user can't access this route */}
        <Route
          path="/wishlist"
          element={
            <PrivateRoute>
              <AllWishlistPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/cart"
          element={
            <PrivateRoute>
              <CartPage />
            </PrivateRoute>
          }
        />

        <Route path="*" element={<PageNotFound />} />

        <Route path="/logout" element={<LogoutPage />} />

        <Route path="/address" element={<CreateAddress />} />

        <Route path="/all/address/:id" element={<GetAllAddress />} />

        <Route path="/payment/:id/:addId" element={<PaymentPage />} />
        
      </Routes>
      <Footer />
    </>
  );
}

export default App;
