import { useState } from "react";
import { useContext } from "react";
import { createContext } from "react";
import { getAddress } from "../../API/AddressAPI/getAddress";

export const AddressContext = createContext();

export const AllAddressContext = () => useContext(AddressContext);

export const AddressContextProvider = ({ children }) => {
    const [allAddress, setAllAddress] = useState([]);
    const [addressError, setAddressError] = useState("");

    const fetchAddress = async () => {
        try {
            const result = await getAddress();
            const { success, message, error, data } = result;

            if (success) {
                setAllAddress(data);
            } else {
                setAddressError(message || error);
            };

        } catch (error) {
            setAddressError(error.message);
        }
    }
    return (
        <AddressContext.Provider value={{ allAddress, addressError, fetchAddress }}>
            {children}
        </AddressContext.Provider>
    )
}