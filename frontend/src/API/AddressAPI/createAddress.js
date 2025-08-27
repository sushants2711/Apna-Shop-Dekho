export const createAddress = async (data) => {
    try {
        const url = "https://apna-shop-dekho-backend.onrender.com/api/address/add";
        // const url = "http://localhost:5500/api/address/add";
        const response = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
            credentials: "include"
        });

        const result = await response.json();
        return result;
        
    } catch (error) {
        throw new Error(error.message);
    }
}