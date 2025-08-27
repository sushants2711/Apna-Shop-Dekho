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
import { UpdateAddress } from "./pages/address/UpdateAddress";
import { PaymentSucess } from "./pages/payment/PaymentSucess";
import { OrderPage } from "./pages/order/OrderPage";
import { AllAddressPage } from "./pages/address/AllAddressPage";
import { PaymentCartPage } from "./pages/payment/PaymentCartPage";

function App() {
  return (
    <>
      <Navbar />
      <ScrollToTop />

      <Routes>
        {/* Public Routes */}
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

        {/* Open Routes */}
        <Route path="/" element={<HomeProduct />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/brands" element={<Brands />} />
        <Route path="/categories/:category" element={<CategoriesDetails />} />
        <Route path="/brands/:brand" element={<BrandDetails />} />
        <Route path="/product/details/:id" element={<ProductDetailsPage />} />

        {/* Protected Routes */}
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

        {/* Address Routes */}
        <Route
          path="/address"
          element={
            <PrivateRoute>
              <CreateAddress />
            </PrivateRoute>
          }
        />
        <Route
          path="/all/address/:id/"
          element={
            <PrivateRoute>
              <GetAllAddress />
            </PrivateRoute>
          }
        />
        <Route
          path="/address/update/:id"
          element={
            <PrivateRoute>
              <UpdateAddress />
            </PrivateRoute>
          }
        />

        {/* Payment Routes */}
        <Route
          path="/payment/:id/:addId"
          element={
            <PrivateRoute>
              <PaymentPage />
            </PrivateRoute>
          }
        />

        {/* Address Routes */}
        <Route
          path="/all/address/:id/:amount/:size"
          element={
            <PrivateRoute>
              <GetAllAddress />
            </PrivateRoute>
          }
        />

        {/* Payment Routes */}
        <Route
          path="/payment/:id/:amount/:size/:addId"
          element={
            <PrivateRoute>
              <PaymentPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/payment/success"
          element={
            <PrivateRoute>
              <PaymentSucess />
            </PrivateRoute>
          }
        />

        {/* Auth Routes */}
        <Route path="/logout" element={<LogoutPage />} />

        {/* 404 Fallback */}
        <Route path="*" element={<PageNotFound />} />

        <Route path="/order-history" element={
          <PrivateRoute>
            <OrderPage />
          </PrivateRoute>
        } />


        <Route path="/all/address/data" element={<AllAddressPage />} />

        <Route path="/payment-page/:id" element={<PaymentCartPage />} />

      </Routes>

      <Footer />
    </>
  );
}

export default App;
