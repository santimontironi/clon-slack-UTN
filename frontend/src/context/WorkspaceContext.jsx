import { createContext, useState, useEffect } from "react";
import { getMyWorkspacesService, createWorkspaceService, deleteWorkspaceService, getWorkspaceByIdService, getWorkspaceChannelsService, createChannelService, getWorkspaceMembersService, addMemberToWorkspaceService, deleteMemberService } from "../services/workspaceService";

export const WorkspaceContext = createContext();

export const WorkspaceContextProvider = ({ children }) => {
    const [workspaces, setWorkspaces] = useState([]);
    const [workspaceById, setWorkspaceById] = useState(null);
    const [workspaceChannels, setWorkspaceChannels] = useState([]);
    const [workspaceMembers, setWorkspaceMembers] = useState([]);
    const [loading, setLoading] = useState({
        workspaces: true,
        create: false,
        getWorkspace: false,
        createChannel: false,
        getMembers: false,
        getWorkspaceMembers: false,
        sendInvitation: false,
        deleteMember: false
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

    async function createChannel(idWorkspace, channelData) {
        setLoading(prev => ({ ...prev, createChannel: true }));
        try {
            const res = await createChannelService(idWorkspace, channelData);
            const newChannel = res.data.channel;
            setWorkspaceChannels(prev => [...prev, newChannel]);
            return res.data;
        } catch (err) {
            throw err;
        } finally {
            setLoading(prev => ({ ...prev, createChannel: false }));
        }
    }

    async function getWorkspaceMembers(idWorkspace) {
        setLoading(prev => ({ ...prev, getWorkspaceMembers: true }));
        try {
            const res = await getWorkspaceMembersService(idWorkspace);
            setWorkspaceMembers(res.data.members);
            return res.data.members;
        } catch (err) {
            throw err;
        } finally {
            setLoading(prev => ({ ...prev, getWorkspaceMembers: false }));
        }
    }

    async function sendInvitation(idWorkspace, memberData) {
        setLoading(prev => ({ ...prev, sendInvitation: true }));
        try {
            const res = await addMemberToWorkspaceService(idWorkspace, memberData);
            return res.data;
        } catch (err) {
            throw err;
        } finally {
            setLoading(prev => ({ ...prev, sendInvitation: false }));
        }
    }

    async function deleteMember(idWorkspace, idMember) {
        try {
            await deleteMemberService(idWorkspace, idMember);
            setWorkspaceMembers(prev => prev.filter(member => member._id !== idMember));
            return { success: true };
        } catch (err) {
            return { success: false, error: err };
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
                workspaceChannels,
                createChannel,
                getWorkspaceMembers,
                workspaceMembers,
                sendInvitation,
                deleteMember
            }}
        >
            {children}
        </WorkspaceContext.Provider>
    );
};
