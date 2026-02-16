import { useContext, useEffect, useState } from "react"
import ItemChannel from "./ItemChannel"
import { Link } from "react-router"
import Swal2 from "sweetalert2"
import { useNavigate } from "react-router-dom"
import { WorkspaceContext } from "../context/WorkspaceContext"

const SideNav = ({ getWorkspaceChannels, workspaceChannels, workspaceData, user, workspaceMembers, getWorkspaceMembers, leaveWorkspace }) => {
    
    const { selectedChannel, setSelectedChannel } = useContext(WorkspaceContext)

    const [open, setOpen] = useState(false)

    const navigate = useNavigate()

    const [optionsOpen, setOptionsOpen] = useState(false)

    const currentMemberRole = workspaceMembers?.find((member) => member._id === user?._id)?.role

    const canManageWorkspace = currentMemberRole === "admin" || currentMemberRole === "owner"

    useEffect(() => {
        if (getWorkspaceChannels && workspaceData?._id && getWorkspaceMembers) {
            getWorkspaceChannels(workspaceData._id)
            getWorkspaceMembers(workspaceData._id)
        }
    }, [workspaceData?._id])

    const handleLeaveWorkspace = () => {
        try {

            Swal2.fire({
                title: "¿Estás seguro?",
                text: "¿Quieres dejar este espacio de trabajo?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#d33",
                cancelButtonColor: "#3085d6",
                confirmButtonText: "Si, dejar",
                cancelButtonText: "Cancelar",
            }).then((result) => {
                if (result.isConfirmed) {
                    leaveWorkspace(workspaceData._id)
                    navigate("/inicio")
                }
            })
        }
        catch (err) {
            console.error("Error al dejar el espacio de trabajo:", err);
        }
    }

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
                <div className="px-4 py-3 border-b border-[#522653]">
                    <Link
                        to="/inicio"
                        className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors mb-3"
                    >
                        <i className="bi bi-arrow-left"></i>
                        Volver a espacios de trabajo
                    </Link>

                    <div className="flex items-center justify-between">
                        <div className="flex-1">
                            <h2 className="text-lg font-bold truncate">
                                {workspaceData?.title || "Workspace"}
                            </h2>
                            <div className="flex items-center gap-2 mt-1">
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                <span className="text-sm text-gray-300">Activo</span>
                            </div>
                        </div>

                        <Link to={`/workspace/${workspaceData?._id}/miembros`} className="text-xs font-semibold text-purple-300 bg-[#522653] px-2 py-1 rounded-full whitespace-nowrap">
                            {workspaceMembers.length} {workspaceMembers.length === 1 ? "miembro" : "miembros"}
                        </Link>

                        <button
                            onClick={() => setOpen(false)}
                            className="md:hidden p-1 rounded hover:bg-[#522653]"
                        >
                            ✕
                        </button>
                    </div>

                    {canManageWorkspace && (
                        <Link to={`/workspace/${workspaceData?._id}/invitar`} className="mt-3 w-full px-3 py-2 text-sm font-medium cursor-pointer bg-[#964597] text-white rounded hover:bg-[#8f3491] transition-colors flex items-center justify-center gap-2">
                            <i className="bi bi-plus"></i>
                            Invitar por mail
                        </Link>
                    )}
                </div>

                <div className="flex-1 overflow-y-auto">
                    <div className="px-3 py-2">
                        <div className="flex items-center justify-between px-2 py-1 mb-2">
                            <h3 className="text-sm font-semibold text-gray-300 flex items-center gap-1">
                                <i className="bi bi-grid-3x3-gap"></i>
                                Canales
                            </h3>
                            {canManageWorkspace && (
                                <Link to={`/workspace/${workspaceData?._id}/nuevo-canal`} className="text-gray-300 hover:text-white text-xl leading-none">
                                    +
                                </Link>
                            )}
                        </div>

                        {workspaceChannels && workspaceChannels.length > 0 ? (
                            <ul className="space-y-1">
                                {workspaceChannels.map((channel) => (
                                    <li key={channel._id}>
                                        <ItemChannel
                                            channel={channel}
                                            isSelected={selectedChannel?._id === channel._id}
                                            onSelectChannel={setSelectedChannel}
                                        />
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <div className="px-2 py-4 text-center text-gray-400 text-sm">
                                No hay canales aún
                            </div>
                        )}
                    </div>
                </div>

                <div className="border-t border-[#522653] px-4 py-3">
                    <div className="flex items-center gap-2 justify-between">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded bg-linear-to-br from-purple-500 to-pink-500 flex items-center justify-center text-sm font-semibold">
                                {user?.username?.[0]?.toUpperCase()}
                            </div>
                            <p className="text-sm font-medium truncate">
                                {user?.username}
                            </p>
                        </div>

                        <button
                            className="p-1.5 rounded hover:bg-[#522653] transition-colors cursor-pointer"
                            aria-label="Opciones"
                            onClick={() => setOptionsOpen(!optionsOpen)}
                        >
                            <i className="bi bi-three-dots-vertical"></i>
                        </button>

                        {optionsOpen && (
                            <button onClick={() => handleLeaveWorkspace()} className="block absolute right-4 bottom-16 px-4 py-2 text-sm bg-[#d30f29] rounded-xl text-white cursor-pointer hover:bg-[#af192d]">
                                Dejar espacio de trabajo
                            </button>

                        )}
                    </div>
                </div>
            </aside>
        </>
    )
}

export default SideNav