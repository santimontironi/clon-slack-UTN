import Loader from "../layoutComponents/Loader";
import { useState } from "react"
import { useForm } from "react-hook-form";

const ModalNewPassword = ({ setOpenModal, resetPassword, loading }) => {

    const [responseMessage, setResponseMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    async function changePassword(data) {
        try {
            setErrorMessage(null);
            await resetPassword(data);
            setResponseMessage("Se ha enviado un correo con instrucciones para restablecer tu contraseña.");
            reset();
        } catch (err) {
            const message = err?.response?.data?.message || "Error al enviar el correo";
            setErrorMessage(message);
            setResponseMessage(null);
        }
    }

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md relative">
                {loading.resetPassword ? (
                    <div className="p-8">
                        <Loader />
                    </div>
                ) : (
                    <>
                        <div className="p-6 border-b border-gray-200">
                            <div className="flex items-center justify-between">
                                <h2 className="text-2xl font-bold text-[#1d1c1d]">
                                    Restablecer contraseña
                                </h2>
                                <button
                                    onClick={() => setOpenModal(false)}
                                    className="text-gray-500 hover:text-gray-700 transition-colors cursor-pointer"
                                >
                                    <i className="bi bi-x-lg text-xl"></i>
                                </button>
                            </div>
                            <p className="text-sm text-gray-600 mt-2">
                                Introduce tu correo electrónico y te enviaremos instrucciones para restablecer tu contraseña.
                            </p>
                        </div>

                        <div className="p-6">
                            {responseMessage && (
                                <div className="flex items-start gap-3 p-4 rounded-lg mb-4 bg-green-50 border border-green-200">
                                    <i className="bi bi-check-circle-fill text-green-600 shrink-0 mt-0.5"></i>
                                    <p className="text-sm text-green-800">{responseMessage}</p>
                                </div>
                            )}
                            
                            {errorMessage && (
                                <div className="flex items-start gap-3 p-4 rounded-lg mb-4 bg-red-50 border border-red-200">
                                    <i className="bi bi-exclamation-circle-fill text-red-600 shrink-0 mt-0.5"></i>
                                    <p className="text-sm text-red-800">{errorMessage}</p>
                                </div>
                            )}

                            <form onSubmit={handleSubmit(changePassword)}>
                                <div className="mb-5">
                                    <label
                                        htmlFor="email"
                                        className="block text-[15px] font-bold text-[#1d1c1d] mb-2"
                                    >
                                        Correo electrónico
                                    </label>
                                    <input
                                        id="email"
                                        type="email"
                                        placeholder="nombre@empresa.com"
                                        className={`w-full px-3 py-2.75 pb-3.25 text-lg border ${errors.email
                                                ? "border-[#e8912d] focus:shadow-[0_0_0_4px_rgba(232,145,45,0.3)]"
                                                : "border-[#868686] focus:border-[#1264a3] focus:shadow-[0_0_0_4px_rgba(29,155,209,0.3)]"
                                            } rounded transition-all duration-200 focus:outline-none`}
                                        {...register("email", {
                                            required: "El correo electrónico es requerido",
                                            pattern: {
                                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                message: "Correo electrónico inválido"
                                            }
                                        })}
                                    />
                                    {errors.email && (
                                        <p className="flex items-start gap-1.5 mt-2 text-[13px] text-[#e8912d]">
                                            <i className="bi bi-info-circle-fill shrink-0 mt-px"></i>
                                            {errors.email.message}
                                        </p>
                                    )}
                                </div>

                                <div className="flex gap-3 mt-6">
                                    <button
                                        type="button"
                                        onClick={() => setOpenModal(false)}
                                        className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 font-semibold rounded hover:bg-gray-50 transition-colors cursor-pointer"
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-1 px-4 py-3 bg-[#611f69] text-white font-semibold rounded hover:bg-[#4a154b] transition-colors cursor-pointer"
                                    >
                                        Enviar
                                    </button>
                                </div>
                            </form>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default ModalNewPassword