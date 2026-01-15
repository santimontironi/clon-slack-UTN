import useRequest from "./useRequest";
import { registerService } from "../services/authService";

export function useRegister() {
    const { loading, error, sendRequest, response } = useRequest();

    const register = async (data) => {
        return await sendRequest(() =>
            registerService(data)
        );
    };

    return { register, loading, error, response };
}