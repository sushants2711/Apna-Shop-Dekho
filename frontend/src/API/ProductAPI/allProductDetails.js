export const allProductDetails = async (id) => {
    try {
        const url = `https://apna-shop-dekho-backend.onrender.com/api/products/${id}`;
        // console.log(url)
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