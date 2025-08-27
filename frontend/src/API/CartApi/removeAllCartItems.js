export const removeAllCartItems = async () => {
    try {
        const url = "https://apna-shop-dekho-backend.onrender.com/api/cart/remove/all-cart";
        // const url = "http://localhost:5500/api/cart/remove/all-cart";
        const response = await fetch(url, {
            method: "DELETE",
            credentials: "include"
        });
        const result = await response.json();
        return result;
    } catch (error) {
        throw new Error(error.message)
    }
}