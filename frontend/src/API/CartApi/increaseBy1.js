export const cartIncreaseBy1 = async (id) => {
    try {
        const url = `http://localhost:5500/api/cart/update/increase/${id}`;
        const response = await fetch(url, {
            method: "PUT",
            credentials: "include",
        });
        const result = await response.json();
        return result;
    } catch (error) {
        throw new Error(error.message);
    }
};
