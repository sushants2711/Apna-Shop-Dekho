export const sortApi = async (value) => {
    let newUrl = "";

    if (value === "asc") {
        newUrl = `http://localhost:5500/api/products?asc=${value}`;
    } else if (value === "dsc") {
        newUrl = `http://localhost:5500/api/products?dsc=${value}`;
    }

    const response = await fetch(newUrl, {
        method: "GET",
        credentials: "include",
    });

    const result = await response.json();
    return result;
};
