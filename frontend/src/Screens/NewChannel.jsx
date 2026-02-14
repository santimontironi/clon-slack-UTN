import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { WorkspaceContext } from "../context/WorkspaceContext"
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

const NewChannel = () => {

    const { createChannel, loading } = useContext(WorkspaceContext);
    const navigate = useNavigate();

    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const [error, setError] = useState("");

    const { id } = useParams();

    const onSubmit = async (data) => {
        try{
            await createChannel(id, data);
            navigate(-1);
        } catch (err) {
            setError(err?.response?.data?.message);
        }
    };

    return (
        <section className="min-h-screen bg-[#3F0E40] flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-8">
                <button
                    onClick={() => navigate(-1)}
                    className="flex cursor-pointer items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
                >
                    <i className="bi bi-chevron-left"></i>
                    <span className="font-medium">Volver</span>
                </button>

                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Crear un canal</h2>
                    <p className="text-gray-600 text-sm">
                        Los canales son donde tu equipo se comunica. Funcionan mejor cuando están organizados por tema — #marketing, por ejemplo.
                    </p>
                </div>
                {error && (
                    <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
                        {error}
                    </div>
                )}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div>
                        <label htmlFor="name" className="block text-sm font-semibold text-gray-900 mb-2">
                            Nombre
                        </label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium">
                                #
                            </span>
                            <input
                                type="text"
                                id="name"
                                {...register("name", {
                                    required: "El nombre del canal es obligatorio",
                                    pattern: {
                                        value: /^[a-z0-9-_]+$/,
                                        message: "Usa letras minúsculas, números, guiones y guiones bajos"
                                    }
                                })}
                                className="w-full pl-8 pr-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4A154B] focus:border-transparent text-gray-900"
                                placeholder="ej. plan-presupuesto"
                            />
                        </div>
                        {errors.name && (
                            <p className="mt-1.5 text-sm text-red-600">{errors.name.message}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="description" className="block text-sm font-semibold text-gray-900 mb-2">
                            Descripción <span className="text-gray-500 font-normal">(opcional)</span>
                        </label>
                        <textarea
                            id="description"
                            {...register("description")}
                            rows="3"
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4A154B] focus:border-transparent resize-none text-gray-900"
                            placeholder="¿De qué trata este canal?"
                        />
                        <p className="mt-1.5 text-xs text-gray-500">
                            Ayuda a los miembros a entender para qué es este canal
                        </p>
                    </div>

                    <div className="flex justify-end space-x-3 pt-4">
                        <button
                            type="button"
                            onClick={() => reset()}
                            className="px-5 py-2.5 cursor-pointer text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={loading.createChannel}
                            className="px-5 py-2.5 cursor-pointer text-sm font-medium text-white bg-[#4A154B] hover:bg-[#3F0E40] rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading.createChannel ? "Creando..." : "Crear"}
                        </button>
                    </div>
                </form>
            </div>
        </section>
    )
}

export default NewChannel