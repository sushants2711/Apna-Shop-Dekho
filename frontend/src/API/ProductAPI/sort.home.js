export const sortApi = async (value) => {
    let newUrl = "";

    if (value === "asc") {
        newUrl = `https://apna-shop-dekho-backend.onrender.com/api/products?asc=${value}`;
    } else if (value === "dsc") {
        newUrl = `https://apna-shop-dekho-backend.onrender.com/api/products?dsc=${value}`;
    }

    const response = await fetch(newUrl, {
        method: "GET",
        credentials: "include",
    });

    const result = await response.json();
    return result;
};
