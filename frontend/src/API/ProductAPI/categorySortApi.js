export const categorySortApi = async (decode, value) => {
    try {
        let newUrl = "";

        if (value === "asc") {
            newUrl = `https://apna-shop-dekho-backend.onrender.com/api/products/category/${decode}?asc=${value}`;
        } else if (value === "dsc") {
            newUrl = `https://apna-shop-dekho-backend.onrender.com/api/products/category/${decode}?dsc=${value}`;
        };

        console.log(newUrl)

        const response = await fetch(newUrl, {
            method: "GET",
            credentials: "include",
        });

        const result = await response.json();
        return result;

    } catch (error) {
        throw new Error(error.message);
    }
};
