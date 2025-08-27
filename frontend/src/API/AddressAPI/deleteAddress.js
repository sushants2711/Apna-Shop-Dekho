export const deleteAddressApi = async (id) => {
    try {
        const url = `https://apna-shop-dekho-backend.onrender.com/api/address/delete/${id}`;
        // const url = `http://localhost:5500/api/address/delete/${id}`;
        const response = await fetch(url, {
            method: "DELETE",
            credentials: "include"
        });
        const result = await response.json();
        return result;
    } catch (error) {
        throw new Error(error.message);
    }
}