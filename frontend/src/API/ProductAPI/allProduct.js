export const allProduct = async () => {
    try {
        const url = `https://apna-shop-dekho-backend.onrender.com/api/products`;
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
