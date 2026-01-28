import { createContext, useState, useEffect } from "react";
import useRequest from "../hook/useRequest";
import { getMyWorkspacesService } from "../services/workspaceService";

export const WorkspaceContext = createContext();

export const WorkspaceContextProvider = ({ children }) => {
    const [workspaces, setWorkspaces] = useState([]);
    const { loading, error, sendRequest } = useRequest();

    useEffect(() => {
        async function loadWorkspaces() {
            try {
                const data = await sendRequest(getMyWorkspacesService);
                if (data?.workspaces) {
                    setWorkspaces(data.workspaces);
                }
            } catch (err) {
                console.error("Error loading workspaces:", err);
            }
        }

        loadWorkspaces();
    }, []);

    return (
        <WorkspaceContext.Provider
            value={{
                workspaces,
                loading,
                error
            }}
        >
            {children}
        </WorkspaceContext.Provider>
    );
};
