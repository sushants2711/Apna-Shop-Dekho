export const cartIncreaseBy1 = async (id) => {
    try {
        const url = `https://apna-shop-dekho-backend.onrender.com/api/cart/update/increase/${id}`;
        const response = await fetch(url, {
            method: "PUT",
            credentials: "include",
        });
        const result = await response.json();
        return result;
    } catch (error) {
        throw new Error(error.message);
    }
};
