import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useNavigate } from 'react-router-dom';


export const PaymentSucess = () => {

  const navigate = useNavigate();

  setTimeout(() => {
    navigate("/order-history")
  }, 2000)

  // useEffect(() => {
  //   document.title = "Payment-Success"
  // }, []);

  return (
    <>
      <Helmet>
        <title>Payment Successful | Apna Shop</title>
        <meta
          name="description"
          content="Your payment was successful! Thank you for shopping with Apna Shop. Track your order in the My Orders section."
        />
        <meta
          name="keywords"
          content="payment success, order confirmed, apna shop, successful payment"
        />
      </Helmet>

      <main className="d-flex vh-100 justify-content-center align-items-center bg-light">
        <section className="text-center p-5 bg-light shadow rounded border border-2 border-dark">
          <h2 className="text-success">
            Payment successfully done
          </h2>
          <Link to="/" className='btn btn-primary my-2'>Home-Page</Link>
        </section>
      </main>
    </>
  );
};
