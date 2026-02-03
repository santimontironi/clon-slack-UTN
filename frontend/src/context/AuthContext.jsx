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

    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                logout,
                login,
                register
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};