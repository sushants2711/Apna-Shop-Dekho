export const demoBuyNow = async (id, amount, size, addId) => {
    try {
        // const url = `http://localhost:5500/api/payment/add/${id}/${amount}/${size}/${addId}`;
        const url = `https://apna-shop-dekho-backend.onrender.com/api/payment/add/${id}/${amount}/${size}/${addId}`;
        const response = await fetch(url, {
            method: "POST",
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            },
        })
        const result = await response.json();
        return result;
    }
    catch (error) {
        throw new Error(error.message);
    }
}