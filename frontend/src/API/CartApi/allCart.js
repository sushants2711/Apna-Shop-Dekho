export const allCart = async () => {
    try {
        const url = "http://localhost:5500/api/cart";
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