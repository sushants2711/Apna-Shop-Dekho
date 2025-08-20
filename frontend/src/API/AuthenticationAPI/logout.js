export const handleLogoutAPI = async () => {
    try {
        const url = "https://apna-shop-dekho-backend.onrender.com/api/user/logout";
        const response = await fetch(url, {
            method: "POST",
            credentials: "include"
        });
        const result = await response.json();
        return result;
    } catch (error) {
        throw new Error(error.message);
    };
};
