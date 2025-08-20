export const allBrandApi = async () => {
    try {
        const url = "https://apna-shop-dekho-backend.onrender.com/api/products/brand";
        const response = await fetch(url, {
            method: "GET",
            credentials: "include"
        });
        const result = await response.json();
        return result;
    } catch (error) {
        throw new Error(error.message)
    }
}