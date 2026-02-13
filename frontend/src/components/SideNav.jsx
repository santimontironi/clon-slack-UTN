import { useEffect, useState } from "react"
import ItemChannel from "./ItemChannel"
import { Link } from "react-router"

const SideNav = ({ getWorkspaceChannels, workspaceChannels, workspaceData, user }) => {

    const [open, setOpen] = useState(false)

    const [optionsOpen, setOptionsOpen] = useState(false)

    useEffect(() => {
        if (getWorkspaceChannels && workspaceData?._id) {
            getWorkspaceChannels(workspaceData._id)
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
                <div className="px-4 py-4 border-b border-[#522653]">
                    <div className="flex items-start justify-between">
                        <div className="flex-1">
                            <h2 className="text-lg font-bold truncate">
                                {workspaceData?.title || "Workspace"}
                            </h2>
                            <div className="flex items-center gap-2 mt-1">
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                <span className="text-sm text-gray-300">Activo</span>
                            </div>
                        </div>

                        <button
                            onClick={() => setOpen(false)}
                            className="md:hidden p-1 rounded hover:bg-[#522653]"
                        >
                            ✕
                        </button>
                    </div>

                    <Link to={`/workspace/${workspaceData?._id}/agregar-miembro`} className="mt-3 w-full px-3 py-2 text-sm font-medium cursor-pointer bg-white text-[#4A154B] rounded hover:bg-gray-100 transition-colors flex items-center justify-center gap-2">
                        <i className="bi bi-plus"></i>
                        Agregar miembros
                    </Link>
                </div>

                <div className="flex-1 overflow-y-auto">
                    <div className="px-3 py-2">
                        <div className="flex items-center justify-between px-2 py-1 mb-2">
                            <h3 className="text-sm font-semibold text-gray-300 flex items-center gap-1">
                                <i className="bi bi-grid-3x3-gap"></i>
                                Canales
                            </h3>
                            <Link to={`/workspace/${workspaceData?._id}/nuevo-canal`} className="text-gray-300 hover:text-white text-xl leading-none">
                                +
                            </Link>
                        </div>

                        {workspaceChannels && workspaceChannels.length > 0 ? (
                            <ul className="space-y-1">
                                {workspaceChannels.map((channel) => (
                                    <li key={channel._id}>
                                        <ItemChannel
                                            id={channel._id}
                                            channel={channel}
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
                            <div className="absolute right-4 bottom-16 bg-[#4A154B] border border-[#522653] rounded shadow-lg py-2 w-48 z-50">
                                <button className="block px-4 py-2 text-sm hover:bg-[#522653]">
                                    Abandonar workspace
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </aside>
        </>
    )
}

export default SideNav