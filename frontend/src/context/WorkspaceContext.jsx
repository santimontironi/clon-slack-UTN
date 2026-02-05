import { createContext, useState, useEffect } from "react";
import { getMyWorkspacesService, createWorkspaceService, deleteWorkspaceService } from "../services/workspaceService";

export const WorkspaceContext = createContext();

export const WorkspaceContextProvider = ({ children }) => {
    const [workspaces, setWorkspaces] = useState([]);
    const [loading, setLoading] = useState({
        workspaces: true,
        create: false
    });

    useEffect(() => {
        async function loadMyWorkspaces() {
            try {
                const res = await getMyWorkspacesService();
                const data = res.data;
                setWorkspaces(data.workspaces);
                
            } catch (err) {
                console.error("Error loading workspaces:", err);
            } finally {
                setLoading(prev => ({ ...prev, workspaces: false }));
            }
        }

        loadMyWorkspaces();
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

    async function deleteWorkspace(idWorkspace) {
        try {
            await deleteWorkspaceService(idWorkspace);
            setWorkspaces(prev => prev.filter(ws => ws._id !== idWorkspace));
        } catch (err) {
            throw err;
        }
    }

    return (
        <WorkspaceContext.Provider
            value={{
                workspaces,
                loading,
                createWorkspace,
                deleteWorkspace
            }}
        >
            {children}
        </WorkspaceContext.Provider>
    );
};
