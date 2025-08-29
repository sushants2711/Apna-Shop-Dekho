import React, { useState, useEffect } from "react";
import { orderHistory } from "../../API/Order/orderHistory";

export const OrderPage = () => {
  const [orderData, setOrderData] = useState([]);
  const [orderError, setOrderError] = useState(null);

  useEffect(() => {
    document.title = "Order-Page"
  }, []);

  const fetchOrderDetails = async () => {
    try {
      const result = await orderHistory();
      const { success, message, error, data } = result;

      if (success) {
        setOrderData(data);
      } else {
        setOrderError(message || error);
      }
    } catch (error) {
      setOrderError(error.message);
    }
  };

  useEffect(() => {
    fetchOrderDetails();
  }, []);

  return (
    <div className="container my-4">
      <h2 className="text-center mb-4">My Orders</h2>

      {orderError && (
        <div className="alert alert-danger text-center">{orderError}</div>
      )}

      {orderData.length === 0 && !orderError && (
        <div className="alert alert-info text-center">No orders found</div>
      )}

      <div className="accordion" id="orderAccordion">
        {orderData.map((order, index) => (
          <div className="accordion-item mb-3 shadow-sm" key={order._id}>
            {/* Order Header */}
            <h2 className="accordion-header" id={`heading-${index}`}>
              <button
                className="accordion-button collapsed fw-bold"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={`#collapse-${index}`}
              >
                Order: {order._id}
              </button>
            </h2>

            <div
              id={`collapse-${index}`}
              className="accordion-collapse collapse"
              data-bs-parent="#orderAccordion"
            >
              <div className="accordion-body">
                <div className="row g-3">

                  <div className="col-12 col-md-8 p-0 p-md-2">

                    <h6 className="mb-2">🛍️ Products</h6>
                    <div className="table-responsive">
                      <table className="table table-sm table-bordered align-middle">
                        <thead className="table-light">
                          <tr>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Size</th>
                            <th>Qty</th>
                            <th>Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          {order.products.map((p) => (
                            <tr key={p._id}>
                              <td>{p.productId?.name}</td>
                              <td>₹{p.productId?.price}</td>
                              <td>{p.size}</td>
                              <td>{p.quantity}</td>
                              <td>₹{p.productId?.price * p.quantity}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>



                    {/* Order Summary */}
                    <h6 className="mt-4">📋 Order Summary</h6>
                    <p className="mb-1">
                      <strong>Total Amount:</strong> ₹{order.totalAmount}
                    </p>
                    <p className="mb-1">
                      <strong>Date:</strong>{" "}
                      {new Date(order.createdAt).toLocaleString()}
                    </p>

                    <hr />
                    {/* User Info */}
                    <h6 className="mt-3">👤 User Info</h6>
                    <p className="mb-1">
                      <strong>Name:</strong> {order.user?.name}
                    </p>
                    <p className="mb-1">
                      <strong>Email:</strong> {order.user?.email}
                    </p>

                    <hr />

                    {/* Address Info */}
                    <h6 className="mt-3">📦 Delivery Address</h6>
                    <p className="mb-1">
                      {order.addressId?.name}, {order.addressId?.phoneNumber}
                    </p>
                    <p className="mb-1">
                      {order.addressId?.landmark}, {order.addressId?.city},{" "}
                      {order.addressId?.state} - {order.addressId?.pinCode}
                    </p>
                  </div>


                  <div className="col-12 col-md-4 text-center">
                    {order.products[0]?.productId?.images?.[0]?.url && (
                      <img
                        src={order.products[0].productId.images[0].url}
                        alt="Product"
                        className="img-fluid rounded shadow-sm"
                        style={{ maxHeight: "400px", objectFit: "cover" }}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
