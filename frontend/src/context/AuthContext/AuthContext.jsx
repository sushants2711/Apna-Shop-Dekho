import React, { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

export const allAuthContext = () => useContext(AuthContext)

export const AuthContextProvider = ({ children }) => {
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userRole, setUserRole] = useState("");

    const setUserDetailsInLocalStorage = (data1, data2, data3) => {
        localStorage.setItem("name", data1);
        localStorage.setItem("email", data2);
        localStorage.setItem("role", data3);
    };

    const fetchDetailsFromLocalStorage = () => {
        const name = localStorage.getItem("name");
        const email = localStorage.getItem("email");
        const role = localStorage.getItem("role");

        setUserName(name);
        setUserEmail(email);
        setUserEmail(role)
    };

    const removeDataFromLocalStorage = () => {
        localStorage.removeItem("name");
        localStorage.removeItem("email");
        localStorage.removeItem("role")

        setUserName("");
        setUserEmail("");
        setUserRole("");
    };

    return (
        <AuthContext.Provider
            value={{
                userName,
                userEmail,
                userRole,
                setUserDetailsInLocalStorage,
                fetchDetailsFromLocalStorage,
                removeDataFromLocalStorage,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
