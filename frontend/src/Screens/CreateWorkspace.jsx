import { useForm } from 'react-hook-form'
import { useContext } from 'react'
import { WorkspaceContext } from '../context/WorkspaceContext'
import { useNavigate } from 'react-router-dom'

const CreateWorkspace = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm()
    const { createWorkspace, loading } = useContext(WorkspaceContext)
    const navigate = useNavigate()

    async function onSubmit(data) {
        try {
            const formData = new FormData()
            formData.append('title', data.title)
            formData.append('description', data.description || '')

            if (data.image && data.image[0]) {
                formData.append('image', data.image[0])
            }

            await createWorkspace(formData)
            reset()
            navigate('/inicio')
        } catch (error) {
            console.error('Error creating workspace:', error)
        }
    }

    return (
        <section className="min-h-screen bg-linear-to-br from-[#f8f8f8] to-white p-5 font-['Slack-Lato','Lato','Helvetica_Neue',Helvetica,Arial,sans-serif]">
            <div className="max-w-full md:max-w-180 lg:max-w-200 xl:max-w-225 mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <button
                        className="w-10 h-10 rounded border border-[#e0e0e0] bg-white flex items-center justify-center cursor-pointer transition-all duration-200 ease-in-out text-[#1d1c1d] hover:bg-[#f8f8f8] hover:border-[#cccccc]"
                        onClick={() => navigate(-1)}
                        aria-label="Volver al dashboard"
                    >
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                        </svg>
                    </button>

                    <div>
                        <svg className="w-10 h-10" viewBox="0 0 124 124" fill="none">
                            <path d="M26.3996 78.3999C26.3996 84.8999 21.0996 90.1999 14.5996 90.1999C8.09961 90.1999 2.79961 84.8999 2.79961 78.3999C2.79961 71.8999 8.09961 66.5999 14.5996 66.5999H26.3996V78.3999Z" fill="#E01E5A" />
                            <path d="M32.2996 78.3999C32.2996 71.8999 37.5996 66.5999 44.0996 66.5999C50.5996 66.5999 55.8996 71.8999 55.8996 78.3999V109.6C55.8996 116.1 50.5996 121.4 44.0996 121.4C37.5996 121.4 32.2996 116.1 32.2996 109.6V78.3999Z" fill="#E01E5A" />
                            <path d="M44.0996 26.4001C37.5996 26.4001 32.2996 21.1001 32.2996 14.6001C32.2996 8.1001 37.5996 2.8001 44.0996 2.8001C50.5996 2.8001 55.8996 8.1001 55.8996 14.6001V26.4001H44.0996Z" fill="#36C5F0" />
                            <path d="M44.0996 32.2999C50.5996 32.2999 55.8996 37.5999 55.8996 44.0999C55.8996 50.5999 50.5996 55.8999 44.0996 55.8999H12.8996C6.39961 55.8999 1.09961 50.5999 1.09961 44.0999C1.09961 37.5999 6.39961 32.2999 12.8996 32.2999H44.0996Z" fill="#36C5F0" />
                            <path d="M97.5996 44.0999C97.5996 37.5999 102.9 32.2999 109.4 32.2999C115.9 32.2999 121.2 37.5999 121.2 44.0999C121.2 50.5999 115.9 55.8999 109.4 55.8999H97.5996V44.0999Z" fill="#2EB67D" />
                            <path d="M91.6996 44.0999C91.6996 50.5999 86.3996 55.8999 79.8996 55.8999C73.3996 55.8999 68.0996 50.5999 68.0996 44.0999V12.8999C68.0996 6.3999 73.3996 1.0999 79.8996 1.0999C86.3996 1.0999 91.6996 6.3999 91.6996 12.8999V44.0999Z" fill="#2EB67D" />
                            <path d="M79.8996 97.5999C86.3996 97.5999 91.6996 102.9 91.6996 109.4C91.6996 115.9 86.3996 121.2 79.8996 121.2C73.3996 121.2 68.0996 115.9 68.0996 109.4V97.5999H79.8996Z" fill="#ECB22E" />
                            <path d="M79.8996 91.7001C73.3996 91.7001 68.0996 86.4001 68.0996 79.9001C68.0996 73.4001 73.3996 68.1001 79.8996 68.1001H111.1C117.6 68.1001 122.9 73.4001 122.9 79.9001C122.9 86.4001 117.6 91.7001 111.1 91.7001H79.8996Z" fill="#ECB22E" />
                        </svg>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.08)] p-8 md:p-10 lg:px-20 lg:py-25 mb-6">
                    <div className="text-center mb-8 pb-6 border-b border-[#e0e0e0]">
                        <h1 className="text-[28px] md:text-4xl lg:text-[42px] xl:text-5xl font-bold text-[#1d1c1d] mb-3 tracking-tight">
                            Crear un espacio de trabajo
                        </h1>
                        <p className="text-[15px] md:text-base lg:text-lg leading-normal text-[#616061] m-0">
                            Los espacios de trabajo son donde tu equipo se comunica. Son mejores cuando están organizados por un objetivo común.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
                        <div className="mb-6">
                            <label htmlFor="title" className="block text-[15px] font-bold text-[#1d1c1d] mb-2 leading-snug">
                                Nombre del espacio de trabajo *
                            </label>
                            <input
                                id="title"
                                type="text"
                                placeholder="Ej: Acme Marketing o Equipo de Ventas de Acme"
                                className={`w-full px-3 py-2.75 pb-3 text-lg leading-[1.33333333] border ${errors.title
                                        ? "border-[#e8912d] focus:shadow-[0_0_0_4px_rgba(232,145,45,0.3)]"
                                        : "border-[#868686] focus:border-[#1264a3] focus:shadow-[0_0_0_4px_rgba(29,155,209,0.3)]"
                                    } rounded transition-all duration-200 ease-in-out box-border font-inherit text-[#1d1c1d] placeholder:text-[#616061] focus:outline-none`}
                                {...register("title", {
                                    required: "El nombre del espacio de trabajo es obligatorio",
                                    minLength: {
                                        value: 3,
                                        message: "El nombre debe tener al menos 3 caracteres"
                                    }
                                })}
                            />
                            {errors.title && (
                                <p className="flex items-start gap-1.5 mt-2 text-[13px] text-[#e8912d] leading-snug">
                                    <svg className="shrink-0 mt-px" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                        <path d="M8 0C3.6 0 0 3.6 0 8C0 12.4 3.6 16 8 16C12.4 16 16 12.4 16 8C16 3.6 12.4 0 8 0ZM8 12C7.4 12 7 11.6 7 11C7 10.4 7.4 10 8 10C8.6 10 9 10.4 9 11C9 11.6 8.6 12 8 12ZM9 9H7V4H9V9Z" fill="#E8912D" />
                                    </svg>
                                    {errors.title.message}
                                </p>
                            )}
                        </div>

                        <div className="mb-6">
                            <label htmlFor="description" className="block text-[15px] font-bold text-[#1d1c1d] mb-2 leading-snug">
                                Descripción (opcional)
                            </label>
                            <textarea
                                id="description"
                                rows="4"
                                placeholder="¿De qué trata este espacio de trabajo?"
                                className="w-full px-3 py-2.75 pb-3 text-lg leading-[1.33333333] border border-[#868686] rounded transition-all duration-200 ease-in-out box-border font-inherit text-[#1d1c1d] placeholder:text-[#616061] focus:outline-none focus:border-[#1264a3] focus:shadow-[0_0_0_4px_rgba(29,155,209,0.3)] resize-y min-h-25"
                                {...register("description")}
                            />
                        </div>

                        <div className="mb-6">
                            <label htmlFor="image" className="block text-[15px] font-bold text-[#1d1c1d] mb-2 leading-snug">
                                Imagen del espacio de trabajo (opcional)
                            </label>
                            <input
                                id="image"
                                type="file"
                                accept="image/*"
                                className="w-full px-3 py-2.75 pb-3 text-base border border-[#868686] rounded box-border transition-all duration-200 ease-in-out font-inherit text-[#1d1c1d] bg-white cursor-pointer focus:outline-none focus:border-[#1264a3] focus:shadow-[0_0_0_4px_rgba(29,155,209,0.3)] file:px-4 file:py-2 file:mr-3 file:bg-[#f8f8f8] file:border file:border-[#cccccc] file:rounded file:text-[15px] file:font-semibold file:text-[#1d1c1d] file:cursor-pointer file:transition-all file:duration-200 file:font-inherit hover:file:bg-[#e8e8e8] hover:file:border-[#868686]"
                                {...register("image")}
                            />
                            <p className="text-[13px] text-[#616061] mt-2 mb-0">
                                PNG, JPG, GIF hasta 5MB
                            </p>
                        </div>

                        <div className="mt-8 flex flex-col-reverse md:flex-row md:justify-between gap-3">
                            <button
                                type="button"
                                className="w-full md:w-[48%] bg-white text-[#1d1c1d] text-lg font-bold px-5 py-3.5 pb-3.75 border border-[#868686] rounded cursor-pointer transition-all duration-100 ease-in-out font-inherit hover:bg-[#f8f8f8] hover:border-[#1d1c1d]"
                                onClick={() => navigate(-1)}
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                className="w-full md:w-[48%] bg-[#611f69] text-white text-lg font-bold px-5 py-3.5 pb-3.75 border-none rounded cursor-pointer transition-all duration-100 ease-in-out font-inherit hover:bg-[#4a154b] hover:shadow-[0_1px_4px_rgba(0,0,0,0.3)] active:bg-[#350d36] disabled:bg-[#868686] disabled:cursor-not-allowed"
                                disabled={loading.create}
                            >
                                {loading.create ? 'Creando...' : 'Crear espacio de trabajo'}
                            </button>
                        </div>
                    </form>
                </div>

                <div className="bg-white rounded-lg p-6 border border-[#e0e0e0]">
                    <h3 className="text-base font-bold text-[#1d1c1d] mb-4 mt-0">
                        💡 Consejos para tu espacio de trabajo
                    </h3>
                    <ul className="m-0 pl-5">
                        <li className="text-sm text-[#616061] leading-relaxed mb-2">
                            Usa un nombre descriptivo que todos reconozcan
                        </li>
                        <li className="text-sm text-[#616061] leading-relaxed mb-2">
                            Mantén la organización con canales temáticos
                        </li>
                        <li className="text-sm text-[#616061] leading-relaxed mb-0">
                            Invita a tu equipo después de crear el espacio
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    )
}

export default CreateWorkspace
