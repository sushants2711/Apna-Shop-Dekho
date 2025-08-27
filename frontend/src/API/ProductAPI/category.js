export const categoryApi = async () => {
    try {
        const url = "https://apna-shop-dekho-backend.onrender.com/api/products/category";
        // const url = "http://localhost:5500/api/products/category";
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
