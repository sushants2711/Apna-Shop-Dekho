import React from 'react';

export const Footer = () => {
  return (
    <>
      <footer className="bg-dark text-light py-4 my-5">
        <div className="container">
          <h4 className="text-center mb-4">
            &copy; 2025 E-Commerce || APNA SHOP
          </h4>
          <div className="row">
            
            <div className="col-md-6">
              <h5>Address</h5>
              <hr />
              <p className="mb-1">Head Office: Noida Sector 15, Near Fire Station</p>
              <p className="mb-0">Pincode: 201301</p>
            </div>

           
            <div className="col-md-6 text-md-end mt-5 mt-md-0">
              <h5>Contact</h5>
              <hr />
              <p className="mb-1">Phone: +91 90990 12213</p>
              <p className="mb-0">Email: support@apnashop.com</p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};
