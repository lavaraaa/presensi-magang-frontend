import React, {
    createContext,
    useEffect,
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

    const [loading, setLoading] = useState(true);


    // ========================================
    // CEK SESSION SAAT APLIKASI DIBUKA
    // ========================================

    useEffect(() => {

        const checkSession = async () => {

            const savedToken =
                localStorage.getItem("token");

            if (!savedToken) {

                setLoading(false);

                return;

            }

            try {

                const response =
                    await axios.get(
                        "/auth/me",
                        {
                            headers: {
                                Authorization:
                                    `Bearer ${savedToken}`,
                            },
                        }
                    );

                const currentUser =
                    response.data.user;

                localStorage.setItem(
                    "user",
                    JSON.stringify(currentUser)
                );

                setUser(currentUser);
                setToken(savedToken);

            } catch (error) {

                localStorage.removeItem("token");
                localStorage.removeItem("user");

                setToken(null);
                setUser(null);

            } finally {

                setLoading(false);

            }

        };


        checkSession();

    }, []);


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