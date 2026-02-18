import { useState } from "react"
import Swal2 from "sweetalert2"
import { useNavigate } from "react-router-dom"

const SideNavFooter = ({ user, workspaceId, leaveWorkspace, workspaceMembers }) => {
    const [optionsOpen, setOptionsOpen] = useState(false)
    const navigate = useNavigate()

    const handleLeaveWorkspace = () => {
        const currentMemberRole = workspaceMembers?.find((m) => m._id === user?._id)?.role //se verifica el rol del usuario actual
        const isAdminOrOwner = currentMemberRole === "admin" || currentMemberRole === "owner" //se determina si el usuario es admin o owner
        const otherAdmins = workspaceMembers?.filter((m) => (m.role === "admin" || m.role === "owner") && m._id !== user?._id) || [] //se buscan otros admins u owners en el workspace, excluyendo al usuario actual
        const noOtherAdmins = isAdminOrOwner && otherAdmins.length === 0 //si el usuario es admin u owner y no hay otros admins u owners, se muestra una advertencia especial al intentar abandonar el workspace

        Swal2.fire({
            title: "¿Estás seguro?",
            text: noOtherAdmins
                ? "Si abandonas este workspace no quedará otro administrador. Mejor agrega a otro antes para no dejar el servidor sin administración. ¿Quieres continuar?"
                : "¿Quieres dejar este espacio de trabajo?",
            icon: noOtherAdmins ? "warning" : "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Si, dejar",
            cancelButtonText: "Cancelar",
        }).then((result) => {
            if (result.isConfirmed) {
                leaveWorkspace(workspaceId)
                navigate("/inicio")
            }
        })
    }

    return (
        <div className="border-t border-[#522653] px-4 py-4">
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
                    <button 
                        onClick={handleLeaveWorkspace} 
                        className="block absolute right-4 bottom-16 px-4 py-2 text-sm bg-[#d30f29] rounded-xl text-white cursor-pointer hover:bg-[#af192d]"
                    >
                        Dejar espacio de trabajo
                    </button>
                )}
            </div>
        </div>
    )
}

export default SideNavFooter
