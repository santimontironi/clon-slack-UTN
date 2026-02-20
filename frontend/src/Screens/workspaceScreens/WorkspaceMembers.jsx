import { useContext, useEffect } from "react"
import { WorkspaceContext } from "../../context/WorkspaceContext"
import { AuthContext } from "../../context/AuthContext"
import { useParams, useNavigate } from "react-router"
import MemberItem from "../../components/workspaceComponents/MemberItem"
import Loader from "../../components/layoutComponents/Loader"
import Swal2 from "sweetalert2"

const WorkspaceMembers = () => {

    const { getWorkspaceMembers, workspaceMembers, loading, deleteMember } = useContext(WorkspaceContext)
    const { user } = useContext(AuthContext)

    const currentMember = workspaceMembers?.find((member) => member._id === user?._id)
    const isAdminOrOwner = currentMember?.role === "admin" || currentMember?.role === "owner"

    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        getWorkspaceMembers(id)
    }, [id])

    const handleDelete = (idWorkspace, idMember) => {
        Swal2.fire({
            title: '¿Estás seguro?',
            text: "Esta acción no se puede deshacer",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteMember(idWorkspace, idMember)
                Swal2.fire(
                    'Eliminado',
                    'El miembro ha sido eliminado.',
                    'success'
                )
            }
            else {
                Swal2.fire(
                    'Cancelado',
                    'El miembro no ha sido eliminado.',
                    'info'
                )
            }
        })
    }

    return (
        <section className="min-h-screen bg-[#4A154B] p-6">
            <div className="max-w-4xl mx-auto">
                <div className="mb-6">
                    <button
                        onClick={() => navigate(`/workspace/${id}`)}
                        className="text-gray-300 hover:text-white mb-4 flex items-center gap-2 text-sm cursor-pointer"
                    >
                        <i className="bi bi-chevron-left"></i>
                        Volver al workspace
                    </button>

                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-white mb-2">
                                Miembros del workspace
                            </h1>
                            <p className="text-gray-300 text-sm">
                                {workspaceMembers?.length || 0} {workspaceMembers?.length === 1 ? 'miembro' : 'miembros'}
                            </p>
                        </div>

                        {isAdminOrOwner && (
                            <button
                                onClick={() => navigate(`/workspace/${id}/invitar`)}
                                className="px-4 py-2 bg-[#4A154B] text-white font-semibold rounded-md hover:bg-[#3d1140] transition-colors shadow-sm flex items-center gap-2 cursor-pointer"
                            >
                                <i className="bi bi-plus-lg"></i>
                                Agregar miembro
                            </button>
                        )}
                    </div>
                </div>

                {loading.getWorkspaceMembers ? (
                    <Loader />
                ) : (
                    <div className="bg-white rounded-lg shadow border border-gray-200">
                        {workspaceMembers && workspaceMembers.length > 0 ? (
                            workspaceMembers.map((member) => (
                                <MemberItem currentMember={currentMember} isAdminOrOwner={isAdminOrOwner} key={member._id} role={member.role} username={member.username} deleteMember={() => handleDelete(id, member._id)} />
                            ))
                        ) : (
                            <div className="p-12 text-center">
                                <i className="bi bi-people text-gray-400 text-6xl mb-4"></i>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                    No hay miembros aún
                                </h3>
                                <p className="text-gray-600 mb-4">
                                    Comienza agregando miembros a tu workspace
                                </p>
                                {isAdminOrOwner && (
                                    <button
                                        onClick={() => navigate(`/workspace/${id}/agregar-miembro`)}
                                        className="px-4 py-2 bg-[#4A154B] text-white font-semibold rounded-md hover:bg-[#3d1140] transition-colors cursor-pointer"
                                    >
                                        Agregar primer miembro
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </section>
    )
}

export default WorkspaceMembers