import { dashboardUserService } from "../services/authService";
import useRequest from "./useRequest";

function useDashboard(){
    const { loading, error, sendRequest } = useRequest();

    const checkSession = async () => {
        return await sendRequest(() =>
            dashboardUserService()
        );
    }

    return { checkSession, loading, error };
}

export default useDashboard