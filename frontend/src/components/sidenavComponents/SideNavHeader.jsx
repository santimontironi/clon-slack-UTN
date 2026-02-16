import { Link } from "react-router"

const SideNavHeader = ({ workspaceData, workspaceMembers, canManageWorkspace, onClose }) => {
    return (
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
                    onClick={onClose}
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
    )
}

export default SideNavHeader
