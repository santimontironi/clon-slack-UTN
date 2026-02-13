import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import Loader from "../components/Loader"
import { checkInvitationService } from "../services/workspaceService"

const AcceptInvitation = () => {
    const { token } = useParams()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const acceptInvitation = async () => {
            try {
                const response = await checkInvitationService(token)
                
                const workspaceId = response.data.workspaceId

                setTimeout(() => {
                    navigate(`/workspace/${workspaceId}`)
                }, 2000)
                
            } catch (err) {
                console.error('Error al aceptar invitación:', err)
                
                if (err.response?.status === 404) {
                    setError('¡Te registraste recientemente! Ingresa para unirte al workspace.')
                    setTimeout(() => {
                        navigate(`/`)
                    }, 3000)
                } else {
                    setError(err.response?.data?.message || 'Error al procesar la invitación')
                    setTimeout(() => {
                        navigate('/')
                    }, 3000)
                }
            } finally {
                setLoading(false)
            }
        }

        if (token) {
            acceptInvitation()
        }
    }, [token, navigate])

    if (loading) {
        return (
            <section className="min-h-screen bg-[#3F0E40] flex items-center justify-center p-4">
                <div className="text-center">
                    <Loader />
                    <p className="text-white mt-4">Procesando invitación...</p>
                </div>
            </section>
        )
    }

    if (error) {
        return (
            <section className="min-h-screen bg-[#3F0E40] flex items-center justify-center p-4">
                <div className="w-full max-w-md">
                    <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-8 text-center">
                        <div className="mb-4">
                            <i className="bi bi-x-circle-fill text-red-600 text-6xl"></i>
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">
                            Error
                        </h1>
                        <p className="text-gray-600">
                            {error}
                        </p>
                        <p className="text-sm text-gray-500 mt-4">
                            Serás redirigido en unos segundos...
                        </p>
                    </div>
                </div>
            </section>
        )
    }

    return (
        <section className="min-h-screen bg-[#3F0E40] flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-8 text-center">
                    <div className="mb-4">
                        <i className="bi bi-check-circle-fill text-green-600 text-6xl"></i>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">
                        ¡Bienvenido!
                    </h1>
                    <p className="text-gray-600">
                        Te has unido al workspace exitosamente
                    </p>
                    <p className="text-sm text-gray-500 mt-4">
                        Serás redirigido en unos segundos...
                    </p>
                </div>
            </div>
        </section>
    )
}

export default AcceptInvitation
