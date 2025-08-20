export const handleDeleteAPI = async (id) => {
    try {
        const url = `https://apna-shop-dekho-backend.onrender.com/api/cart/delete/${id}`;
        const response = await fetch(url, {
            method: "DELETE",
            credentials: "include"
        });
        const result = await response.json();
        return result;
    } catch (error) {
        throw new Error(error.message);
    }
}