import { useParams, useNavigate } from "react-router"
import { resetPasswordService } from "../../services/authService";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const ChangePassword = () => {
    const { token } = useParams();
    const navigate = useNavigate();

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    useEffect(() => {
        if (!token) {
            setError("Token no proporcionado");
            return;
        }
    }, [token]);

    const submitForm = async (data) => {
        try {
            setError("");
            const response = await resetPasswordService(token, data.newPassword);
            setMessage(response.data.message);
            reset();

            setTimeout(() => {
                navigate("/");
            }, 2000);
        } catch (err) {
            setError(err?.response?.data?.message || "Error al cambiar la contraseña");
            setMessage("");
        }
    }

    return (
        <section className="min-h-screen flex items-center justify-center bg-[#f8f8f8] p-5">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-8">
                <div className="text-center mb-8">
                    <svg className="w-12 h-12 mb-6 mx-auto" viewBox="0 0 124 124" fill="none">
                        <path d="M26.3996 78.3999C26.3996 84.8999 21.0996 90.1999 14.5996 90.1999C8.09961 90.1999 2.79961 84.8999 2.79961 78.3999C2.79961 71.8999 8.09961 66.5999 14.5996 66.5999H26.3996V78.3999Z" fill="#E01E5A" />
                        <path d="M32.2996 78.3999C32.2996 71.8999 37.5996 66.5999 44.0996 66.5999C50.5996 66.5999 55.8996 71.8999 55.8996 78.3999V109.6C55.8996 116.1 50.5996 121.4 44.0996 121.4C37.5996 121.4 32.2996 116.1 32.2996 109.6V78.3999Z" fill="#E01E5A" />
                        <path d="M44.0996 26.4001C37.5996 26.4001 32.2996 21.1001 32.2996 14.6001C32.2996 8.1001 37.5996 2.8001 44.0996 2.8001C50.5996 2.8001 55.8996 8.1001 55.8996 14.6001V26.4001H44.0996Z" fill="#36C5F0" />
                        <path d="M44.0996 32.2999C50.5996 32.2999 55.8996 37.5999 55.8996 44.0999C55.8996 50.5999 50.5996 55.8999 44.0996 55.8999H12.8996C6.39961 55.8999 1.09961 50.5999 1.09961 44.0999C1.09961 37.5999 6.39961 32.2999 12.8996 32.2999H44.0996Z" fill="#36C5F0" />
                        <path d="M97.5996 44.0999C97.5996 37.5999 102.9 32.2999 109.4 32.2999C115.9 32.2999 121.2 37.5999 121.2 44.0999C121.2 50.5999 115.9 55.8999 109.4 55.8999H97.5996V44.0999Z" fill="#2EB67D" />
                        <path d="M91.6996 44.0999C91.6996 50.5999 86.3996 55.8999 79.8996 55.8999C73.3996 55.8999 68.0996 50.5999 68.0996 44.0999V12.8999C68.0996 6.3999 73.3996 1.0999 79.8996 1.0999C86.3996 1.0999 91.6996 6.3999 91.6996 12.8999V44.0999Z" fill="#2EB67D" />
                        <path d="M79.8996 97.5999C86.3996 97.5999 91.6996 102.9 91.6996 109.4C91.6996 115.9 86.3996 121.2 79.8996 121.2C73.3996 121.2 68.0996 115.9 68.0996 109.4V97.5999H79.8996Z" fill="#ECB22E" />
                        <path d="M79.8996 91.7001C73.3996 91.7001 68.0996 86.4001 68.0996 79.9001C68.0996 73.4001 73.3996 68.1001 79.8996 68.1001H111.1C117.6 68.1001 122.9 73.4001 122.9 79.9001C122.9 86.4001 117.6 91.7001 111.1 91.7001H79.8996Z" fill="#ECB22E" />
                    </svg>
                    <h1 className="text-3xl font-bold text-[#1d1c1d] mb-2">
                        Cambiar contraseña
                    </h1>
                    <p className="text-sm text-gray-600">
                        Introduce tu nueva contraseña para continuar
                    </p>
                </div>

                {message && (
                    <div className="flex items-start gap-3 p-4 rounded-lg mb-5 bg-green-50 border border-green-200">
                        <i className="bi bi-check-circle-fill text-green-600 shrink-0 mt-0.5"></i>
                        <div className="flex-1">
                            <p className="text-sm text-green-800 font-semibold mb-1">
                                ¡Contraseña cambiada exitosamente!
                            </p>
                            <p className="text-sm text-green-700">
                                {message} Serás redirigido al inicio de sesión...
                            </p>
                        </div>
                    </div>
                )}

                {error && (
                    <div className="flex items-start gap-3 p-4 rounded-lg mb-5 bg-red-50 border border-red-200">
                        <i className="bi bi-exclamation-circle-fill text-red-600 shrink-0 mt-0.5"></i>
                        <div className="flex-1">
                            <p className="text-sm text-red-800 font-semibold mb-1">
                                Error al cambiar contraseña
                            </p>
                            <p className="text-sm text-red-700">
                                {error}
                            </p>
                        </div>
                    </div>
                )}

                <form onSubmit={handleSubmit(submitForm)} className="space-y-5">
                    <div>
                        <label
                            htmlFor="newPassword"
                            className="block text-[15px] font-bold text-[#1d1c1d] mb-2"
                        >
                            Nueva contraseña
                        </label>
                        <input
                            type="password"
                            id="newPassword"
                            placeholder="Introduce tu nueva contraseña"
                            className={`w-full px-3 py-2.75 pb-3.25 text-lg border ${errors.newPassword
                                    ? "border-[#e8912d] focus:shadow-[0_0_0_4px_rgba(232,145,45,0.3)]"
                                    : "border-[#868686] focus:border-[#1264a3] focus:shadow-[0_0_0_4px_rgba(29,155,209,0.3)]"
                                } rounded transition-all duration-200 focus:outline-none`}
                            {...register("newPassword", {
                                required: "La nueva contraseña es obligatoria",
                            })}
                        />
                        {errors.newPassword && (
                            <p className="flex items-start gap-1.5 mt-2 text-[13px] text-[#e8912d]">
                                <i className="bi bi-info-circle-fill shrink-0 mt-px"></i>
                                {errors.newPassword.message}
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-[#611f69] text-white text-lg font-bold px-5 py-3.5 rounded cursor-pointer transition-all hover:bg-[#4a154b] hover:shadow-lg"
                    >
                        Cambiar contraseña
                    </button>
                </form>

                <div className="text-center mt-6 pt-6 border-t border-gray-200">
                    <p className="text-sm text-gray-600">
                        <button
                            onClick={() => navigate("/")}
                            className="text-[#1264a3] font-semibold hover:underline cursor-pointer"
                        >
                            Volver al inicio de sesión
                        </button>
                    </p>
                </div>
            </div>
        </section>
    )
}

export default ChangePassword