import { useParams } from "react-router"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../context/AuthContext"

const VerifyEmail = () => {
    const { token } = useParams()
    const { verifyEmail } = useContext(AuthContext);
    const [status, setStatus] = useState('loading');

    useEffect(() => {
        const verify = async () => {
            try {
                await verifyEmail(token);
                setStatus('success');
            } catch (error) {
                setStatus('error');
            }
        }
        verify();
    }, [token])

    return (
        <section className="min-h-screen bg-[#3F0E40] flex items-center justify-center p-4">

            <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-8 text-center">
                {status === 'loading' && (
                    <>
                        <div className="mb-6">
                            <div className="w-16 h-16 mx-auto mb-4 border-4 border-[#4A154B] border-t-transparent rounded-full animate-spin"></div>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">
                            Verificando tu email
                        </h2>
                        <p className="text-gray-600">
                            Por favor espera mientras confirmamos tu dirección de correo...
                        </p>
                    </>
                )}

                {status === 'success' && (
                    <>
                        <div className="mb-6">
                            <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                                <i className="bi bi-check-lg text-2xl text-green-600"></i>
                            </div>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">
                            ¡Email verificado!
                        </h2>
                        <p className="text-gray-600 mb-6">
                            Tu cuenta ha sido verificada exitosamente. Ya puedes comenzar a usar la plataforma.
                        </p>
                        <a
                            href="/login"
                            className="inline-block px-6 py-3 text-sm font-medium text-white bg-[#4A154B] hover:bg-[#3F0E40] rounded-md transition-colors"
                        >
                            Ir al inicio de sesión
                        </a>
                    </>
                )}

                {status === 'error' && (
                    <>
                        <div className="mb-6">
                            <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
                                <i className="bi bi-x-lg text-2xl text-red-600"></i>
                            </div>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">
                            Error al verificar
                        </h2>
                        <p className="text-gray-600 mb-6">
                            No pudimos verificar tu email. El enlace puede haber expirado o ser inválido.
                        </p>
                        <a
                            href="/"
                            className="inline-block px-6 py-3 text-sm font-medium text-white bg-[#4A154B] hover:bg-[#3F0E40] rounded-md transition-colors"
                        >
                            Volver al inicio
                        </a>
                    </>
                )}
            </div>
        </section>
    )
}

export default VerifyEmail