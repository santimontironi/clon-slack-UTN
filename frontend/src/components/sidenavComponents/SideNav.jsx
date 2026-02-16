import { useEffect, useState } from "react"
import SideNavHeader from "./SideNavHeader"
import ChannelList from "../channelComponents/ChannelList"
import SideNavFooter from "./SideNavFooter"

const SideNav = ({ getWorkspaceChannels, workspaceChannels, workspaceData, user, workspaceMembers, getWorkspaceMembers, leaveWorkspace }) => {
    
    const [open, setOpen] = useState(false)

    const currentMemberRole = workspaceMembers?.find((member) => member._id === user?._id)?.role
    const canManageWorkspace = currentMemberRole === "admin" || currentMemberRole === "owner"

    useEffect(() => {
        if (getWorkspaceChannels && workspaceData?._id && getWorkspaceMembers) {
            getWorkspaceChannels(workspaceData._id)
            getWorkspaceMembers(workspaceData._id)
        }
    }, [workspaceData?._id])

    return (
        <>
            <button
                onClick={() => setOpen(true)}
                className="md:hidden fixed top-3 left-3 z-50 p-2 rounded bg-[#4A154B] border border-[#522653] shadow"
            >
                <i className="bi bi-list text-white"></i>
            </button>

            {open && (
                <div
                    className="fixed inset-0 bg-black/40 z-40 md:hidden"
                    onClick={() => setOpen(false)}
                />
            )}

            <aside className={`fixed top-0 left-0 z-50 h-screen w-64 bg-[#4A154B] text-white flex flex-col border-r border-[#522653] transform transition-transform duration-300 ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 `}>
                <SideNavHeader 
                    workspaceData={workspaceData}
                    workspaceMembers={workspaceMembers}
                    canManageWorkspace={canManageWorkspace}
                    onClose={() => setOpen(false)}
                />

                <ChannelList 
                    workspaceChannels={workspaceChannels}
                    workspaceId={workspaceData?._id}
                    canManageWorkspace={canManageWorkspace}
                />

                <SideNavFooter 
                    user={user}
                    workspaceId={workspaceData?._id}
                    leaveWorkspace={leaveWorkspace}
                />
            </aside>
        </>
    )
}

export default SideNav