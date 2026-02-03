import { createContext, useState, useEffect } from "react";
import { getMyWorkspacesService, createWorkspaceService } from "../services/workspaceService";

export const WorkspaceContext = createContext();

export const WorkspaceContextProvider = ({ children }) => {
    const [workspaces, setWorkspaces] = useState([]);
    const [loading, setLoading] = useState({
        workspaces: true,
        create: false
    });

    useEffect(() => {
        async function loadWorkspaces() {
            try {
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
        setLoading(prev => ({ ...prev, create: true }));
        try {
            const res = await createWorkspaceService(workspaceData);
            const newWorkspace = res.data.workspace;
            setWorkspaces(prev => [...prev, newWorkspace]);
            return res.data;
        } catch (err) {
            throw err;
        } finally {
            setLoading(prev => ({ ...prev, create: false }));
        }
    }

    return (
        <WorkspaceContext.Provider
            value={{
                workspaces,
                loading,
                createWorkspace
            }}
        >
            {children}
        </WorkspaceContext.Provider>
    );
};
