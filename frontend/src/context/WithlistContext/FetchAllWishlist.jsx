import React, { createContext, useContext, useState } from "react";
import { getALlWishlist } from "../../API/wishlist/allWishlist";
import { handleError } from "../../toastMessage/errorMessage";

export const FetchAllWishlist = createContext();

export const allWishlistContext = () => useContext(FetchAllWishlist);

export const FetchAllWishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const [wishlistError, setWishlistError] = useState("");
  const [lengthWishlist, setLengthWishlist] = useState(0);
  const [amount, setAmount] = useState(0);

  const fetchWishlist = async () => {
    try {
      const result = await getALlWishlist();
      const { success, message, error, data, length, totalAmount } = result;

      if (success) {
        setWishlist(data);
        if(length > 0) {
            setLengthWishlist(length);
        }else{
            setLengthWishlist("");
        }
        setAmount(totalAmount);
        setWishlistError("");
      } else {
        setWishlistError(message || error);
      }
    } catch (err) {
      setWishlistError(err.message);
      handleError(err.message);
    }
  };

  return (
    <FetchAllWishlist.Provider
      value={{
        wishlist,
        wishlistError,
        lengthWishlist,
        amount,
        fetchWishlist,
      }}
    >
      {children}
    </FetchAllWishlist.Provider>
  );
};
