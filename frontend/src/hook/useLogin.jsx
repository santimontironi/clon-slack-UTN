import useRequest from "./useRequest";
import { loginService } from "../services/authService";

export function useLogin() {
    const { loading, error, sendRequest } = useRequest();

    const login = async (data) => {
        return await sendRequest(() =>
            loginService(data)
        );
    };

    return { login, loading, error };
}