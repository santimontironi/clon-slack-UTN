import { WorkspaceContext } from "../context/WorkspaceContext"
import { useForm } from "react-hook-form"
import { useParams } from "react-router"
import { useContext, useState } from "react"
import { useNavigate } from "react-router"
import Loader from "../components/Loader"

const AddMember = () => {

    const { addMember, loading } = useContext(WorkspaceContext)

    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const [error, setError] = useState('');

    const { id } = useParams();

    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            setError('');
            await addMember(id, data);
            navigate(`/workspace/${id}`);
        }
        catch (err) {
            setError(err.response?.data?.message || 'Ocurrió un error al agregar el miembro');
            reset();
        }
    }

    return (
        <section className="min-h-screen bg-[#3F0E40] flex items-center justify-center p-4">
            {loading.addMember ? <Loader /> : (

                <div className="w-full max-w-md">
                    <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-8">
                        <div className="mb-6">
                            <button
                                onClick={() => navigate(`/workspace/${id}`)}
                                className="text-gray-600 cursor-pointer hover:text-gray-800 mb-4 flex items-center gap-2 text-sm"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                                Volver
                            </button>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                Agregar miembro
                            </h1>
                            <p className="text-gray-600 text-sm">
                                Invita a un nuevo miembro al workspace
                            </p>
                        </div>

                        {error && (
                            <div className="mb-5 bg-red-50 border border-red-200 rounded-lg p-4">
                                <div className="flex gap-3">
                                    <svg className="w-5 h-5 text-red-600 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                    </svg>
                                    <div className="flex-1">
                                        <h3 className="text-sm font-semibold text-red-900 mb-1">
                                            Error al agregar miembro
                                        </h3>
                                        <p className="text-sm text-red-800">
                                            {error}
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => setError('')}
                                        className="text-red-400 hover:text-red-600 transition-colors"
                                    >
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        )}

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-semibold text-gray-900 mb-2"
                                >
                                    Correo electrónico
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    {...register("email", {
                                        required: "El email es requerido",
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message: "Email inválido"
                                        }
                                    })}
                                    placeholder="nombre@ejemplo.com"
                                    className={`w-full px-4 py-3 border rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4A154B] focus:border-transparent transition-all ${errors.email ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                />
                                {errors.email && (
                                    <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                        </svg>
                                        {errors.email.message}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label
                                    htmlFor="role"
                                    className="block text-sm font-semibold text-gray-900 mb-2"
                                >
                                    Rol
                                </label>
                                <select
                                    id="role"
                                    {...register("role", {
                                        required: "El rol es requerido"
                                    })}
                                    className={`w-full px-4 py-3 border rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#4A154B] focus:border-transparent transition-all appearance-none bg-white ${errors.role ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                >
                                    <option value="">Selecciona un rol</option>
                                    <option value="member">Miembro</option>
                                    <option value="admin">Administrador</option>
                                </select>
                                {errors.role && (
                                    <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                        </svg>
                                        {errors.role.message}
                                    </p>
                                )}
                                <p className="mt-2 text-xs text-gray-500">
                                    Los administradores pueden gestionar canales y miembros
                                </p>
                            </div>

                            <div className="flex gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => navigate(`/workspace/${id}`)}
                                    className="flex-1 px-4 py-3 cursor-pointer border border-gray-300 text-gray-700 font-semibold rounded-md hover:bg-gray-50 transition-colors"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-4 py-3 cursor-pointer bg-[#4A154B] text-white font-semibold rounded-md hover:bg-[#3d1140] transition-colors shadow-sm"
                                >
                                    Agregar miembro
                                </button>
                            </div>
                        </form>
                    </div>

                    <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <div className="flex gap-3">
                            <svg className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                            </svg>
                            <div>
                                <h3 className="text-sm font-semibold text-blue-900 mb-1">
                                    ¿Cómo funciona?
                                </h3>
                                <p className="text-sm text-blue-800">
                                    El usuario recibirá una invitación para unirse al workspace con el rol seleccionado.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    )
}

export default AddMember