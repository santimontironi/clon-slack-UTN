import { useEffect, useState } from "react"

const SideNav = ({ getWorkspaceChannels, workspaceChannels, workspaceData, user }) => {

    const [open, setOpen] = useState(false)

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
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>

            {open && (
                <div
                    className="fixed inset-0 bg-black/40 z-40 md:hidden"
                    onClick={() => setOpen(false)}
                />
            )}

            <aside
                className={`
                fixed top-0 left-0 z-50 h-screen w-64
                bg-[#4A154B] text-white flex flex-col
                border-r border-[#522653]
                transform transition-transform duration-300
                ${open ? "translate-x-0" : "-translate-x-full"}
                md:translate-x-0
                `}
            >
                <div className="px-4 py-4 border-b border-[#522653] flex items-start justify-between">
                    <div>
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

                <div className="flex-1 overflow-y-auto">
                    <div className="px-3 py-2">
                        <div className="flex items-center justify-between px-2 py-1 mb-2">
                            <h3 className="text-sm font-semibold text-gray-300 flex items-center gap-1">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                                </svg>
                                Canales
                            </h3>
                            <button className="text-gray-300 hover:text-white text-xl leading-none">
                                +
                            </button>
                        </div>

                        {workspaceChannels && workspaceChannels.length > 0 ? (
                            <ul className="space-y-1">
                                {workspaceChannels.map((channel) => (
                                    <li key={channel._id}>
                                        <button className="w-full px-2 py-1.5 rounded text-left text-sm hover:bg-[#350d36] transition flex items-center gap-2">
                                            <span className="text-gray-400">#</span>
                                            <span className="truncate">{channel.name}</span>
                                        </button>
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
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded bg-linear-to-br from-purple-500 to-pink-500 flex items-center justify-center text-sm font-semibold">
                            {user?.username?.[0]?.toUpperCase()}
                        </div>
                        <p className="text-sm font-medium truncate">
                            {user?.username}
                        </p>
                    </div>
                </div>
            </aside>
        </>
    )
}

export default SideNav
