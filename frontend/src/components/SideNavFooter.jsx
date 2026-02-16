import { useState } from "react"
import Swal2 from "sweetalert2"
import { useNavigate } from "react-router-dom"

const SideNavFooter = ({ user, workspaceId, leaveWorkspace }) => {
    const [optionsOpen, setOptionsOpen] = useState(false)
    const navigate = useNavigate()

    const handleLeaveWorkspace = () => {
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
                leaveWorkspace(workspaceId)
                navigate("/inicio")
            }
        })
    }

    return (
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
