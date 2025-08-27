import React from 'react';
import { Link, useNavigate } from 'react-router-dom';


export const PaymentSucess = () => {

  const navigate = useNavigate();

  setTimeout(() => {
    navigate("/order-history")
  }, 2000)

  return (
    <main className="d-flex vh-100 justify-content-center align-items-center bg-light">
      <section className="text-center p-5 bg-light shadow rounded border border-2 border-dark">
        <h2 className="text-success">
          Payment successfully done
        </h2>
        <Link to="/" className='btn btn-primary my-2'>Home-Page</Link>
      </section>
    </main>
  );
};
