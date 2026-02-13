import { useContext } from 'react'
import { WorkspaceContext } from '../context/WorkspaceContext'
import Swal from "sweetalert2";
import { Link } from 'react-router';

const WorkspaceList = ({ id, title, description, image, created_at }) => {

    const { deleteWorkspace } = useContext(WorkspaceContext);

    const handleDelete = async (idWorkspace) => {
        try {
            const result = await Swal.fire({
                title: '¿Estás seguro?',
                text: "Esta acción no se puede deshacer.",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, eliminar',
                cancelButtonText: 'Cancelar'
            })

            if (result.isConfirmed) {
                await deleteWorkspace(idWorkspace);
            }
        } catch (error) {
            console.error('Error deleting workspace:', error);
        }
    }

    const formatDate = (date) =>
        new Date(date).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })

    return (
        <div className="bg-white border border-[#e0e0e0] rounded-lg overflow-hidden transition-all duration-200 ease-in-out cursor-pointer flex flex-col hover:border-[#1264a3] hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] hover:-translate-y-0.5">
            <div className="w-full h-45 md:h-50 lg:h-50 xl:h-60 overflow-hidden bg-[#f8f8f8] relative">
                <button
                    onClick={() => handleDelete(id)}
                    className="absolute top-3 right-3 bg-black/60 border-none rounded-md px-2 py-1.5 text-white cursor-pointer transition-all duration-200 ease-in-out flex items-center justify-center hover:bg-[#dc3545] active:scale-95"
                    title="Eliminar workspace"
                >
                    <i className="bi bi-trash text-base"></i>
                </button>

                {image ? (
                    <img
                        src={image}
                        alt={title}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full bg-linear-to-br from-[#611f69] to-[#4a154b] flex items-center justify-center">
                        <span className="text-[64px] md:text-[72px] lg:text-[80px] font-bold text-white">
                            {title?.[0]?.toUpperCase()}
                        </span>
                    </div>
                )}
            </div>

            <div className="p-5 md:p-6 flex flex-col flex-1">
                <div className="mb-3">
                    <h3 className="text-xl md:text-[22px] lg:text-2xl font-bold text-[#1d1c1d] mb-1.5 overflow-hidden text-ellipsis whitespace-nowrap">
                        {title}
                    </h3>
                    <span className="text-[13px] text-[#616061] block">
                        {formatDate(created_at)}
                    </span>
                </div>

                {description && (
                    <p className="text-sm md:text-[15px] text-[#616061] leading-normal mb-4 overflow-hidden line-clamp-2">
                        {description}
                    </p>
                )}

                <div className="flex items-center justify-between mt-auto pt-4 border-t border-[#e0e0e0]">
                    <Link
                        to={`/workspace/${id}`}
                        className="flex items-center gap-1.5 px-4 py-2 bg-[#611f69] text-white border-none rounded font-bold text-[15px] cursor-pointer transition-all duration-200 ease-in-out font-inherit no-underline hover:bg-[#4a154b] active:bg-[#350d36]"
                    >
                        Abrir
                        <i className="bi bi-arrow-right"></i>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default WorkspaceList