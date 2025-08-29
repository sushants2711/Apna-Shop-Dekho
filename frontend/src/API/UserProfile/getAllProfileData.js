export const getAllProfileData = async () => {
    try {
        const url = "https://apna-shop-dekho-backend.onrender.com/api/user/get-user";
        // const url = "http://localhost:5500/api/user/get-user";
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