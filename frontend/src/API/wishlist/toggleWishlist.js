export const toggleWishlistAPi = async (id) => {
    try {
        const url = `http://localhost:5500/api/wishlist/${id}`;
        const response = await fetch(url, {
            method: "POST",
            credentials: "include",
        });
        const result = await response.json();
        return result;
    } catch (error) {
        throw new Error(error.message);
    }
};
