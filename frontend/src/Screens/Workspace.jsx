import { useContext, useEffect } from "react"
import { WorkspaceContext } from "../context/WorkspaceContext"
import { AuthContext } from "../context/AuthContext"
import Loader from "../components/Loader"
import SideNav from "../components/SideNav"
import { useParams } from "react-router"

const Workspace = () => {

    const { getWorkspaceById, workspaceById, loading, getWorkspaceChannels, workspaceChannels, getWorkspaceMembers, amountMembers } = useContext(WorkspaceContext)

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
                amountMembers={amountMembers}
                getWorkspaceMembers={getWorkspaceMembers}
            />

            <div className="flex-1 flex flex-col md:ml-64">

                <main className="flex-1 overflow-y-auto p-6 flex items-center justify-center">
                    {loading.getWorkspace ? (
                        <Loader />
                    ) : (
                        <div className="text-center">
                            <i className="bi bi-chat-left-text text-6xl mx-auto mb-6 text-[#6B3B6E] d-block"></i>
                            <h2 className="text-2xl font-bold text-white mb-3">
                                Bienvenido a {workspaceById?.title || "tu workspace"}
                            </h2>
                            <p className="text-[#D1C7D3] text-lg mb-2">
                                Selecciona un canal para comenzar a chatear
                            </p>
                            <p className="text-[#BFAEC3] text-sm">
                                Los canales están en el menú lateral izquierdo
                            </p>
                        </div>
                    )}
                </main>

            </div>
        </section>
    )
}

export default Workspace