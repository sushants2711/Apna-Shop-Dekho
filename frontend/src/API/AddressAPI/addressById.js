export const addressById = async (id) => {
    try {
        const url = `https://apna-shop-dekho-backend.onrender.com/api/address/${id}`;
        // const url = `http://localhost:5500/api/address/${id}`;
        const response = await fetch(url, {
            method: "GET",
            credentials: "include"
        });
        const result = await response.json();
        return result;
    } catch (error) {
        throw new Error(error.message);
    }
} 