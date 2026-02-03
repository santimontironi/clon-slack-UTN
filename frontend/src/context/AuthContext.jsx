import { createContext, useState, useEffect } from "react";
import { loginService, registerService, dashboardUserService } from "../services/authService";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState({
        session: true,
        login: false,
        register: false
    });

    useEffect(() => {
        async function loadSession() {
            try {
                const res = await dashboardUserService();
                if (res.data.authorized) {
                    setUser(res.data.user);
                } else {
                    setUser(null);
                }
            } catch {
                setUser(null);
            } finally {
                setLoading(prev => ({ ...prev, session: false }));
            }
        }

        loadSession();
    }, []);

    const loginSession = (userData) => {
        setUser(userData);
    };

    const logout = () => {
        setUser(null);
    };

    const login = async (data) => {
        setLoading(prev => ({ ...prev, login: true }));
        try {
            const res = await loginService(data);
            const responseData = res.data;
            loginSession(responseData.user);
            return responseData;
        } finally {
            setLoading(prev => ({ ...prev, login: false }));
        }
    };

    const register = async (data) => {
        setLoading(prev => ({ ...prev, register: true }));
        try {
            const res = await registerService(data);
            const responseData = res.data;
            return responseData;
        } finally {
            setLoading(prev => ({ ...prev, register: false }));
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                loginSession,
                logout,
                login,
                register
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};