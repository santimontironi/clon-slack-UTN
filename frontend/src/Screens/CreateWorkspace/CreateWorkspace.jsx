import { useForm } from 'react-hook-form'
import { useContext } from 'react'
import { WorkspaceContext } from '../../context/WorkspaceContext'
import { useNavigate } from 'react-router-dom'
import './CreateWorkspace.css'

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
        <section className="create-workspace-container">
            <div className="create-workspace-content">
                <div className="workspace-header">
                    <button
                        className="back-button"
                        onClick={() => navigate(-1)}
                        aria-label="Volver al dashboard"
                    >
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                        </svg>
                    </button>

                    <div className="workspace-logo">
                        <svg className="slack-logo" viewBox="0 0 124 124" fill="none">
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

                <div className="create-workspace-card">
                    <div className="card-header">
                        <h1>Crear un espacio de trabajo</h1>
                        <p className="card-subtitle">
                            Los espacios de trabajo son donde tu equipo se comunica. Son mejores cuando están organizados por un objetivo común.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="workspace-form">
                        <div className="form-group">
                            <label htmlFor="title">Nombre del espacio de trabajo *</label>
                            <input
                                id="title"
                                type="text"
                                placeholder="Ej: Acme Marketing o Equipo de Ventas de Acme"
                                className={errors.title ? "input-error" : ""}
                                {...register("title", {
                                    required: "El nombre del espacio de trabajo es obligatorio",
                                    minLength: {
                                        value: 3,
                                        message: "El nombre debe tener al menos 3 caracteres"
                                    }
                                })}
                            />
                            {errors.title && (
                                <p className="error-message">
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                        <path d="M8 0C3.6 0 0 3.6 0 8C0 12.4 3.6 16 8 16C12.4 16 16 12.4 16 8C16 3.6 12.4 0 8 0ZM8 12C7.4 12 7 11.6 7 11C7 10.4 7.4 10 8 10C8.6 10 9 10.4 9 11C9 11.6 8.6 12 8 12ZM9 9H7V4H9V9Z" fill="#E8912D" />
                                    </svg>
                                    {errors.title.message}
                                </p>
                            )}
                        </div>

                        <div className="form-group">
                            <label htmlFor="description">Descripción (opcional)</label>
                            <textarea
                                id="description"
                                rows="4"
                                placeholder="¿De qué trata este espacio de trabajo?"
                                {...register("description")}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="image">Imagen del espacio de trabajo (opcional)</label>
                            <input
                                id="image"
                                type="file"
                                accept="image/*"
                                className="file-input-simple"
                                {...register("image")}
                            />
                            <p className="file-input-hint">PNG, JPG, GIF hasta 5MB</p>
                        </div>

                        <div className="form-actions">
                            <button
                                type="button"
                                className="cancel-button"
                                onClick={() => navigate('/dashboard')}
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                className="submit-button"
                                disabled={loading.create}
                            >
                                {loading.create ? 'Creando...' : 'Crear espacio de trabajo'}
                            </button>
                        </div>
                    </form>
                </div>

                <div className="tips-section">
                    <h3>💡 Consejos para tu espacio de trabajo</h3>
                    <ul>
                        <li>Usa un nombre descriptivo que todos reconozcan</li>
                        <li>Mantén la organización con canales temáticos</li>
                        <li>Invita a tu equipo después de crear el espacio</li>
                    </ul>
                </div>
            </div>
        </section>
    )
}

export default CreateWorkspace