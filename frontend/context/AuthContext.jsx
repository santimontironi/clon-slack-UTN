import { createContext, useState, useEffect } from "react";
import { loginService, registerService, dashboardUserService } from "../src/services/authService";

export const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {

    const [user, setUser] = useState(null)

    const [loading, setLoading] = useState({
        register: false,
        login: false,
        dashboard: true
    })

    const [error, setError] = useState({
        register: null,
        login: null
    })

    const [response, setResponse] = useState({
        register: null,
        login: null
    })

    async function loginUser(data) {
        setLoading((prev) => ({ ...prev, login: true }))
        try {
            const res = await loginService(data)
            setResponse((prev) => ({ ...prev, login: res.data.message }))
            setUser(res.data.user)
        }
        catch (error) {
            setError((prev) => ({ ...prev, login: error?.response?.data?.message }))
            throw error
        }
        finally {
            setLoading((prev) => ({ ...prev, login: false }))
        }
    }

    async function registerUser(data) {
        setLoading((prev) => ({ ...prev, register: true }))
        try {
            const res = await registerService(data)
            setResponse((prev) => ({ ...prev, register: res.data.message }))
        }
        catch (error) {
            setError((prev) => ({ ...prev, register: error?.response?.data?.message  }))
            throw error
        }
        finally {
            setLoading((prev) => ({ ...prev, register: false }))
        }
    }

    useEffect(() => {
        async function dashboardUser() {
            try {
                const res = await dashboardUserService()
                if(res.data.authorized == false) return
                setUser(res.data.user)
            }
            catch (error) {
                setError((prev) => ({ ...prev, dashboard: error?.response?.data?.message }))
                throw error
            }
            finally {
                setLoading((prev) => ({ ...prev, dashboard: false }))
            }
        }

        dashboardUser()
    },[])


    return (
        <AuthContext.Provider value={{ loading, user, registerUser, loginUser, error, response }}>
            {children}
        </AuthContext.Provider>
    )
}