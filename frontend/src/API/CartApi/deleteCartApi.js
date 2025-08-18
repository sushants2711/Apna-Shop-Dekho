export const handleDeleteAPI = async (id) => {
    try {
        const url = `http://localhost:5500/api/cart/delete/${id}`;
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