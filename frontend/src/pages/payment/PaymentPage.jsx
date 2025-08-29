import React, { useEffect, useState } from 'react'
import { AllCartContextCustomHooks } from '../../context/CartContext/AllCartContext'
import { useNavigate, useParams } from 'react-router-dom';
import { handleError } from '../../toastMessage/errorMessage';
import { handleSuccess } from '../../toastMessage/successMessage';
import { ToastContainer } from 'react-toastify';
import { allProductDetails } from '../../API/ProductAPI/allProductDetails';
import { addressById } from '../../API/AddressAPI/addressById';
import { demoBuyNow } from '../../API/PaymentAPI/demoPaymentAPI';
import { Helmet } from 'react-helmet';

export const PaymentPage = () => {

  const { cartItem, fetchAllCart } = AllCartContextCustomHooks();

  const [productData, setProductData] = useState({});
  const [productError, setProductError] = useState(null);
  const [addressData, setAddressData] = useState({});
  const [addressError, setAddressError] = useState(null);

  const navigate = useNavigate();

  // useEffect(() => {
  //   document.title = "Payment-Page"
  // }, []);

  const { id, amount, size, addId } = useParams();

  const buyNow = async () => {
    try {
      const result = await demoBuyNow(id, amount, size, addId)
      const { success, message, error } = result;

      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/payment/success")
        }, 2000)
      } else {
        handleError(message || error);
      }
    } catch (error) {
      handleError(error.message);
    };
  };



  const fetchProductData = async () => {
    try {
      const result = await allProductDetails(id);
      const { success, message, error, data } = result;

      if (success) {
        setProductData(data);
      } else {
        setProductError(message || error);
      };
    } catch (error) {
      handleError(error.message);
    }
  };

  const fetchAddressData = async () => {
    try {
      const result = await addressById(addId);
      const { success, message, error, data } = result;

      if (success) {
        setAddressData(data);
      } else {
        setAddressError(message || error);
      };
    } catch (error) {
      handleError(error.message);
    }
  }

  // console.log(productData)

  useEffect(() => {
    fetchProductData();
    fetchAddressData();
  }, []);



  return (
    <>
      <Helmet>
        <title>Secure Payment | Apna Shop</title>
        <meta
          name="description"
          content="Complete your secure payment on Apna Shop. Multiple payment options including UPI, cards, and wallets."
        />
        <meta
          name="keywords"
          content="payment, checkout, apna shop payment, secure payment, ecommerce"
        />
      </Helmet>
      <main className='container my-5'>
        <h2 className="mb-4 text-center">Payment Page</h2>

        <div className="row">
          {/* Product Info */}
          <div className="col-12 col-md-6 mb-4">
            <div className="card shadow-sm h-100">
              {productData.images?.[0]?.url && (
                <img
                  src={productData.images[0].url}
                  alt={productData.name}
                  className='card-img-top img-fluid'
                  style={{ objectFit: 'cover', maxHeight: '300px' }}
                />
              )}
              <div className="card-body">
                <h5 className="card-title">{productData.name}</h5>
                <p className="card-text">{productData.description}</p>
                <p className="card-text"><strong>Price:</strong> ₹{productData.price}</p>
                <p className="card-text"><strong>Selected Size:</strong> {size}</p>
                <p className="card-text"><strong>Quantity:</strong> {amount}</p>
                <p className="card-text"><strong>Total Amount:</strong> ₹{productData.price * Number(amount)}</p>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 mb-4">
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <h5 className="card-title">Shipping Address</h5>
                <p className="card-text"><strong>Name:</strong> {addressData.name}</p>
                <p className="card-text"><strong>Phone:</strong> {addressData.phoneNumber}</p>
                <p className="card-text"><strong>Email:</strong> {addressData.email || '-'}</p>
                <p className="card-text">
                  <strong>Address:</strong> {addressData.fullAddress}, {addressData.landmark}
                </p>
                <p className="card-text">
                  <strong>City/State/Pin:</strong> {addressData.city}, {addressData.state} - {addressData.pinCode}
                </p>
                <p className="card-text"><strong>Country:</strong> {addressData.country}</p>
              </div>
            </div>
          </div>
        </div>


        <div className="text-center">
          <button className="btn btn-success py-2 px-5" onClick={buyNow}>Buy Now</button>
        </div>
        <ToastContainer />
      </main>
    </>
  )
}
