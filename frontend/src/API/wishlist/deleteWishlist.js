export const deleteWishlist = async (id) => {
    try {
        const url = `https://apna-shop-dekho-backend.onrender.com/api/wishlist/delete/${id}`;
        //  const url = `http://localhost:5500/api/wishlist/delete/${id}`;
        const response = await fetch(url, {
            method: "DELETE",
            credentials: "include",
        });

        const result = await response.json();
        return result;
    } catch (error) {
        throw new Error(error.message);
    }
};
