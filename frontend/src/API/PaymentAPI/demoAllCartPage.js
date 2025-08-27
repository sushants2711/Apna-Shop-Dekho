export const demoAllCartPage = async (id) => {
    try {
        const url =`https://apna-shop-dekho-backend.onrender.com/api/payment/add/${id}`;
        // const url = `http://localhost:5500/api/payment/add/${id}`;
        const response = await fetch(url, {
            method: "POST",
            credentials: "include"
        });
        const result = await response.json();
        return result;
    } catch (error) {
        throw new Error(error.message)
    }
}