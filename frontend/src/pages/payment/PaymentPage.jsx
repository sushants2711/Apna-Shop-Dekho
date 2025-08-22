import React, { useEffect } from 'react'
import { AllCartContextCustomHooks } from '../../context/CartContext/AllCartContext'

export const PaymentPage = () => {

  const { cartItem, fetchAllCart } = AllCartContextCustomHooks();

  useEffect(() => {
    fetchAllCart();
  }, []);

  console.log(cartItem)

  return (
    <>
    <h2>Payment Page</h2>
    
    </>
  )
}
