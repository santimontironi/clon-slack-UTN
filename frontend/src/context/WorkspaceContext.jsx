import { createContext, useState, useEffect } from "react";
import { getMyWorkspacesService, createWorkspaceService, deleteWorkspaceService, getWorkspaceByIdService, getWorkspaceChannelsService } from "../services/workspaceService";

export const WorkspaceContext = createContext();

export const WorkspaceContextProvider = ({ children }) => {
    const [workspaces, setWorkspaces] = useState([]);
    const [workspaceById, setWorkspaceById] = useState(null);
    const [workspaceChannels, setWorkspaceChannels] = useState([]);
    const [loading, setLoading] = useState({
        workspaces: true,
        create: false,
        getWorkspace: false
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

    async function getWorkspaceById(idWorkspace) {
        setLoading(prev => ({ ...prev, getWorkspace: true }));
        try {
            const res = await getWorkspaceByIdService(idWorkspace);
            setWorkspaceById(res.data.workspace);   
            return res.data.workspace;
        } catch (err) {
            throw err;
        } finally {
            setLoading(prev => ({ ...prev, getWorkspace: false }));
        }
    }

    async function getWorkspaceChannels(idWorkspace) {
        try {
            const res = await getWorkspaceChannelsService(idWorkspace);
            setWorkspaceChannels(res.data.channels);
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
                deleteWorkspace,
                getWorkspaceById,
                workspaceById,
                getWorkspaceChannels,
                workspaceChannels
            }}
        >
            {children}
        </WorkspaceContext.Provider>
    );
};
