export const updateAddressApi = async (id, data) => {
    try {
        const url = `https://apna-shop-dekho-backend.onrender.com/api/address/update/${id}`;
        // const url = `http://localhost:5500/api/address/update/${id}`;
        const response = await fetch(url, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
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