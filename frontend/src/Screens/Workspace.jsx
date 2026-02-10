import { useContext, useEffect } from "react"
import { WorkspaceContext } from "../context/WorkspaceContext"
import { AuthContext } from "../context/AuthContext"
import Loader from "../components/Loader"
import SideNav from "../components/SideNav"
import { useParams } from "react-router"
import HeaderWorkspace from "../components/HeaderWorkspace"
import WorkspaceInfo from "../components/WorkspaceInfo"

const Workspace = () => {

    const { getWorkspaceById, workspaceById, loading, getWorkspaceChannels, workspaceChannels} = useContext(WorkspaceContext)

    const { user } = useContext(AuthContext)
    const { id } = useParams()

    useEffect(() => {
        getWorkspaceById(id)
    }, [id])

    return (
        <section className="flex h-screen bg-[#3F0E40] overflow-hidden">
            <SideNav
                getWorkspaceChannels={getWorkspaceChannels}
                workspaceChannels={workspaceChannels}
                workspaceData={workspaceById}
                user={user}
            />

            <div className="flex-1 flex flex-col md:ml-64">

                <HeaderWorkspace workspaceTitle={workspaceById?.title} />

                <main className="flex-1 overflow-y-auto p-6">
                    {loading.getWorkspace ? (
                        <Loader />
                    ) : workspaceById ? (
                        <div className="max-w-full">
                            <div className="py-8">

                                <WorkspaceInfo workspaceTitle={workspaceById?.title} workspaceDescription={workspaceById?.description} />

                                <div className="mt-16 text-center py-8 text-[#D1C7D3]">
                                    <svg
                                        className="w-16 h-16 mx-auto text-[#6B3B6E]"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={1.5}
                                            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                                        />
                                    </svg>

                                    <h3 className="text-lg font-semibold text-white mt-4 mb-2">
                                        No hay mensajes aún
                                    </h3>
                                    <p className="text-sm">
                                        Sé el primero en enviar un mensaje a este canal
                                    </p>
                                </div>

                            </div>
                        </div>
                    ) : (
                        <div className="flex items-center justify-center h-full text-[#D1C7D3]">
                            Selecciona un canal para comenzar
                        </div>
                    )}
                </main>

                <div className="border-t border-[#522653] bg-[#4A154B] p-4 shadow-[0_-1px_4px_rgba(0,0,0,0.25)]">
                    <div className="max-w-full">
                        <div className="border border-[#522653] rounded-lg bg-[#3F0E40] focus-within:border-[#ECB22E] transition">
                            <textarea
                                placeholder={`Mensaje a #${workspaceById?.title || "canal"}`}
                                className="w-full px-4 py-3 text-sm resize-none focus:outline-none rounded-lg bg-transparent text-white placeholder-[#BFAEC3]"
                                rows={3}
                            />

                            <div className="flex items-center justify-between px-3 pb-2">
                                <div className="flex gap-1">
                                    <button className="p-1.5 rounded hover:bg-[#522653] transition">
                                        🙂
                                    </button>
                                    <button className="p-1.5 rounded hover:bg-[#522653] transition">
                                        📎
                                    </button>
                                </div>

                                <button className="px-4 py-1.5 bg-[#ECB22E] text-[#3F0E40] text-sm font-semibold rounded hover:bg-[#F5C84C] transition shadow">
                                    Enviar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    )
}

export default Workspace