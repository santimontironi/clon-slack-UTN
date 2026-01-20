import { createContext, useState, useEffect } from "react";
import useDashboard from "../hook/useDashboard";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [checkingSession, setCheckingSession] = useState(true);

    const { checkSession } = useDashboard();

    useEffect(() => {
        async function loadSession() {
            try {
                const data = await checkSession();

                if (data?.authorized) {
                    setUser(data.user);
                } else {
                    setUser(null);
                }
            } catch {
                setUser(null);
            } finally {
                setCheckingSession(false);
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

    return (
        <AuthContext.Provider
            value={{
                user,
                checkingSession,
                loginSession,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};