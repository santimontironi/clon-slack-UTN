import { createContext, useState, useEffect } from "react";
import { getMyWorkspacesService } from "../services/workspaceService";

export const WorkspaceContext = createContext();

export const WorkspaceContextProvider = ({ children }) => {
    const [workspaces, setWorkspaces] = useState([]);
    const [loading, setLoading] = useState({
        workspaces: false
    });

    useEffect(() => {
        async function loadWorkspaces() {
            try {
                setLoading(prev => ({ ...prev, workspaces: true }));
                const res = await getMyWorkspacesService();
                const data = res.data;
                if (data?.workspaces) {
                    setWorkspaces(data.workspaces);
                }
            } catch (err) {
                console.error("Error loading workspaces:", err);
            } finally {
                setLoading(prev => ({ ...prev, workspaces: false }));
            }
        }

        loadWorkspaces();
    }, []);

    async function createWorkspace(workspaceData) {

    }

    return (
        <WorkspaceContext.Provider
            value={{
                workspaces,
                loading
            }}
        >
            {children}
        </WorkspaceContext.Provider>
    );
};
