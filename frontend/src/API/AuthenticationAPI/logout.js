export const handleLogoutAPI = async () => {
    try {
        const url = "http://localhost:5500/api/user/logout";
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