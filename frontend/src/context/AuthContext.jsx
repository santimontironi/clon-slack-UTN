import { createContext, useState, useEffect } from "react";
import { loginService, registerService, dashboardUserService, logoutUserService, sendResetPasswordEmailService } from "../services/authService";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState({
        session: true,
        login: false,
        register: false,
        resetPassword: false
    });

    const login = async (data) => {
        setLoading(prev => ({ ...prev, login: true }));
        try {
            const res = await loginService(data);
            setUser(res.data.user);
            return res.data;
        } catch (err) {
            throw err;
        } finally {
            setLoading(prev => ({ ...prev, login: false }));
        }
    };

    useEffect(() => {
        async function loadSession() {
            try {
                const res = await dashboardUserService();

                if (res.data.authorized === false) {
                    setUser(null);
                } else {
                    setUser(res.data.user);
                }
            } catch (error) {
                setUser(null);
            } finally {
                setLoading(prev => ({ ...prev, session: false }));
            }
        }

        loadSession();
    }, []);

    const register = async (data) => {
        setLoading(prev => ({ ...prev, register: true }));
        try {
            const res = await registerService(data);
            return res.data;
        } catch (err) {
            throw err;
        } finally {
            setLoading(prev => ({ ...prev, register: false }));
        }
    };

    const verifyEmail = async (token) => {
        try {
            const res = await verifyEmailService(token);
            return res.data;
        } catch (err) {
            throw err;
        }
    };

    const logout = () => {
        try{
            logoutUserService();
            setUser(null);
        } catch (err) {
            throw err;
        }
    };

    const resetPassword = async (data) => {
        setLoading(prev => ({ ...prev, resetPassword: true }));
        try {
            const res = await sendResetPasswordEmailService(data);
            return res.data;
        } catch (err) {
            throw err;
        } finally {
            setLoading(prev => ({ ...prev, resetPassword: false }));
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                logout,
                login,
                register,
                verifyEmail,
                resetPassword
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};