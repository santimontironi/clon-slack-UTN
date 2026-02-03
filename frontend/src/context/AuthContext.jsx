import { createContext, useState, useEffect } from "react";
import useRequest from "../hook/useRequest";
import { loginService, registerService, dashboardUserService } from "../services/authService";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [checkingSession, setCheckingSession] = useState(true);

    const loginRequest = useRequest();
    const registerRequest = useRequest();
    const sessionRequest = useRequest();

    useEffect(() => {
        async function loadSession() {
            try {
                const data = await sessionRequest.sendRequest(() => dashboardUserService());

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

    const login = async (data) => {
        const res = await loginRequest.sendRequest(() => loginService(data));
        loginSession(res.user);
        return res;
    };

    const register = async (data) => {
        return await registerRequest.sendRequest(() => registerService(data));
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                checkingSession,
                loginSession,
                logout,
                login,
                register,
                loginLoading: loginRequest.loading,
                loginError: loginRequest.error,
                registerLoading: registerRequest.loading,
                registerError: registerRequest.error,
                registerResponse: registerRequest.response
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};