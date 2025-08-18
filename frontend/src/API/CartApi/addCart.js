export const addCartAPI = async (id) => {
    try {
        const url = `http://localhost:5500/api/cart/add/${id}`;
        const response = await fetch(url, {
            method: "POST",
            credentials: "include",
        });
        const result = await response.json();
        return result;
    } catch (error) {
        throw new Error(error.message);
    }
};
