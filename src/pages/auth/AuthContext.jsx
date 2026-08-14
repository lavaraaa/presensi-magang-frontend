import React, {
    createContext,
    useState,
} from "react";

import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(() => {
        const savedUser =
            localStorage.getItem("user");

        return savedUser
            ? JSON.parse(savedUser)
            : null;
    });

    const [token, setToken] = useState(() => {
        return localStorage.getItem("token");
    });

    const [loading, setLoading] = useState(false);


    // ========================================
    // LOGIN
    // ========================================

    const login = async (email, password) => {

        const response = await axios.post(
            "/auth/login",
            {
                email,
                password,
            }
        );

        const {
            token,
            user,
        } = response.data;


        localStorage.setItem(
            "token",
            token
        );

        localStorage.setItem(
            "user",
            JSON.stringify(user)
        );


        setToken(token);
        setUser(user);

        return response.data;
    };


    // ========================================
    // LOGOUT
    // ========================================

    const logout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        setToken(null);
        setUser(null);
    };


    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                loading,
                login,
                logout,
                isAuthenticated: !!token,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};