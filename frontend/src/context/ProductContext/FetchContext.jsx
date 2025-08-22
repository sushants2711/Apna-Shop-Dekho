import { createContext, useContext, useState } from "react";
import { allProduct } from "../../API/ProductAPI/allProduct";
import { categoryApi } from "../../API/ProductAPI/category";
import { allBrandApi } from "../../API/ProductAPI/allBrand";
import { categoryDetailsData } from "../../API/ProductAPI/categoryDetailsData";
import { brandDetailsApi } from "../../API/ProductAPI/brandDetails";
import { bestSellerAPI } from "../../API/ProductAPI/bestSeller";

export const FetchContext = createContext();

export const allProductContext = () => useContext(FetchContext);

export const FetchContextProvider = ({ children }) => {
    const [productData, setProductData] = useState([]);
    const [errMessage, setErrMessage] = useState("");

    const [category, setCategory] = useState([]);
    const [categoryError, setCategoryError] = useState("");

    const [brand, setBrand] = useState([]);
    const [brandError, setBrandError] = useState("");

    const [ categoryDetails, setCategoryDetails ] = useState([]);
    const [ categoryDetailsError, setCategoryDetailsError ] = useState(""); 

    const [ brandDetails, setBrandDetails] = useState([]);
    const [ brandDetailsError, setBrandDetailsError] = useState("");

    const [bestSeller, setBestSeller] = useState([]);
    const [bestSellerError, setBestSellerError] = useState("");

    const fetchAlways = async () => {
        try {
            const result = await allProduct();
            const { success, message, error, data } = result;

            if (success) {
                setProductData(data);
            } else {
                setErrMessage(message || error);
            }
        } catch (error) {
            setErrMessage(error.message);
        }
    };

    const fetchCategory = async () => {
        try {
            const result = await categoryApi();
            const { success, message, error, data } = result;

            if (success) {
                setCategory(data);
            } else {
                setError(message || error);
            }
        } catch (error) {
            setError(error);
        }
    };

    const fetchBrand = async () => {
        try {
            const result = await allBrandApi();
            const { success, message, error, data } = result;

            if (success) {
                setBrand(data);
            } else {
                setBrandError(message || error);
            }
        } catch (error) {
            setBrandError(error.message);
        }
    };

    const fetchCategoryDetails = async (category) => {
        try {
            const result = await categoryDetailsData(category);
            const { success, message, error, data } = result;

            if(success) {
                setCategoryDetails(data);
            }else {
                setCategoryDetailsError(message || error);
            }
        } catch (error) {
            setCategoryDetailsError(error.message)
        }
    };

    const fetchBrandDetails = async (brand) => {
        try {
            const result = await brandDetailsApi(brand);
            const { success, message, error, data } = result;

            if(success) {
                setBrandDetails(data);
            }else {
                setBrandDetailsError(message || error);
            }
        } catch (error) {
            setBrandDetailsError(error.message)
        }
    };

    const fetchBestSeller = async () => {
        try {
            const result = await bestSellerAPI();

            const { success, message, data, error } = result;

            if(success) {
                setBestSeller(data);
            }else {
                setBestSellerError(message || error)
            }
        } catch (error) {
            setBestSellerError(error.message);
        }
    }

    return (
        <FetchContext.Provider
            value={{
                productData,
                setProductData,
                errMessage,
                setErrMessage,
                fetchAlways,
                fetchCategory,
                category,
                setCategory,
                categoryError,
                setCategoryError,
                fetchBrand,
                brand,
                brandError,
                categoryDetails,
                setCategoryDetails,
                categoryDetailsError,
                fetchCategoryDetails,
                brandDetails,
                brandDetailsError,
                fetchBrandDetails,
                bestSeller,
                bestSellerError,
                fetchBestSeller,
                setBrandDetails
            }}
        >
            {children}
        </FetchContext.Provider>
    );
};
