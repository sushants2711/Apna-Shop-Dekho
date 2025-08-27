import React, { createContext, useContext, useState } from "react";
import { allCart } from "../../API/CartApi/allCart";
import { handleSuccess } from "../../toastMessage/successMessage";
import { handleError } from "../../toastMessage/errorMessage";
import { cartIncreaseBy1 } from "../../API/CartApi/increaseBy1";

export const AllCartContext = createContext();

export const AllCartContextCustomHooks = () => useContext(AllCartContext);

export const AllCartContextProvider = ({ children }) => {
    const [cartItem, setCartItem] = useState([]);
    const [cartError, setCartError] = useState("");
    const [amount, setAmount] = useState();
    const [totalcartItems, setTotalCartItems] = useState();

    const fetchAllCart = async () => {
        try {
            const result = await allCart();
            const { success, message, error, data, length, finalAllAmount } = result;

            if (success) {
                setCartItem(data);
                setAmount(finalAllAmount);
                setTotalCartItems(length);
                handleSuccess(message);
            } else {
                setCartError(message || error);
                handleError(message || error);
            }
        } catch (error) {
            setCartError(error.message);
        }
    };

    return (
        <AllCartContext.Provider
            value={{ cartItem, setCartItem, cartError, fetchAllCart, amount, totalcartItems, setTotalCartItems }}
        >
            {children}
        </AllCartContext.Provider>
    );
};
