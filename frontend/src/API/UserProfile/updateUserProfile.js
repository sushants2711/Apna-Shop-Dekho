export const updateUserProfileData = async (data) => {
    try {
        const url = "https://apna-shop-dekho-backend.onrender.com/api/user/update-user";
        // const url = "http://localhost:5500/api/user/update-user";
        const response = await fetch(url, {
            method: "PUT",
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