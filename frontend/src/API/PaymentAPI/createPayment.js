export const createPayment = async (data) => {
    try {
        const url = `https://apna-shop-dekho-backend.onrender.com/api/payment/process`
        // const url = `http://localhost:5500/api/payment/process`;
        const response = await fetch(url, {
            method: "POST",
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        const result = await response.json();
        return result;
    } catch (error) {
        throw new Error(error.message);
    };
};


export const getPaymentKey = async () => {
    try {
        const url = "https://apna-shop-dekho-backend.onrender.com/api/payment/getkey";
        // const url = "http://localhost:5500/api/payment/getkey";
        const response = await fetch(url, {
            method: "GET",
            credentials: "include"
        });
        const result = await response.json();
        return result;
    } catch (error) {
        throw new Error(error.message);
    }
};

