import { WorkspaceContext } from "../context/WorkspaceContext"
import { useForm } from "react-hook-form"
import { useParams } from "react-router"
import { useContext, useState } from "react"
import { useNavigate } from "react-router"
import Loader from "../components/Loader"

const SendInvitation = () => {

    const { sendInvitation, loading } = useContext(WorkspaceContext)

    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const [error, setError] = useState('');

    const [success, setSuccess] = useState('');

    const { id } = useParams();

    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            setError('');
            const res = await sendInvitation(id, data);
            setSuccess(res.data.message);
            alert(success)
            reset();
        }
        catch (err) {
            setError(err.response?.data?.message || 'Ocurrió un error al enviar la invitación');
            reset();
        }
    }

    return (
        <section className="min-h-screen bg-[#3F0E40] flex items-center justify-center p-4">
            {loading.sendInvitation ? <Loader /> : (

                <div className="w-full max-w-md">
                    <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-8">
                        <div className="mb-6">
                            <button
                                onClick={() => navigate(`/workspace/${id}`)}
                                className="text-gray-600 cursor-pointer hover:text-gray-800 mb-4 flex items-center gap-2 text-sm"
                            >
                                <i className="bi bi-chevron-left"></i>
                                Volver
                            </button>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                Invitar por email
                            </h1>
                            <p className="text-gray-600 text-sm">
                                Envía una invitación al correo electrónico
                            </p>
                        </div>

                        {error && (
                            <div className="mb-5 bg-red-50 border border-red-200 rounded-lg p-4">
                                <div className="flex gap-3">
                                    <i className="bi bi-x-circle-fill text-red-600 shrink-0 mt-0.5"></i>
                                    <div className="flex-1">
                                        <h3 className="text-sm font-semibold text-red-900 mb-1">
                                            Error al enviar invitación
                                        </h3>
                                        <p className="text-sm text-red-800">
                                            {error}
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => setError('')}
                                        className="text-red-400 hover:text-red-600 transition-colors"
                                    >
                                        <i className="bi bi-x"></i>
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
                                        <i className="bi bi-info-circle-fill"></i>
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
                                        <i className="bi bi-info-circle-fill"></i>
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
                                    Enviar invitación
                                </button>
                            </div>
                        </form>
                    </div>

                    <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <div className="flex gap-3">
                            <i className="bi bi-info-circle-fill text-blue-600 shrink-0 mt-0.5"></i>
                            <div>
                                <h3 className="text-sm font-semibold text-blue-900 mb-1">
                                    ¿Cómo funciona?
                                </h3>
                                <p className="text-sm text-blue-800">
                                    El usuario recibirá un correo electrónico con un enlace para unirse al workspace. 
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    )
}

export default SendInvitation
