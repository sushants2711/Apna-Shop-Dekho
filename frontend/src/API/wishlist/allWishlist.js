export const getALlWishlist = async () => {
    try {
        const url = "https://apna-shop-dekho-backend.onrender.com/api/wishlist";
        // const url = "http://localhost:5500/api/wishlist";
        const response = await fetch(url, {
            method: "GET",
            credentials: "include",
        });
        const result = await response.json();
        return result;
    } catch (error) {
        throw new Error(error.message);
    }
};
