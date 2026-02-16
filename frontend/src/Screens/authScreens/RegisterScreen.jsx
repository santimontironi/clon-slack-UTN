import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import Loader from "../../components/layoutComponents/Loader";

const RegisterScreen = () => {
    const { register: registerUser, loading } = useContext(AuthContext);
    const [registerError, setRegisterError] = useState(null);
    const [registerResponse, setRegisterResponse] = useState(null);

    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    async function formSubmit(data) {
        try {
            setRegisterError(null);
            setRegisterResponse(null);
            const result = await registerUser(data);
            setRegisterResponse(result.message);
            reset();
        } catch (err) {
            const message = err?.response?.data?.message || "Error al registrarse";
            setRegisterError(message);
            reset();
        }
    }

    return (
        <section className="min-h-screen flex items-center justify-center bg-[#f8f8f8] p-5 font-['Slack-Lato','Lato','Helvetica_Neue',Helvetica,Arial,sans-serif]">
            {loading.register ? <Loader /> : (

                <div className="bg-white rounded-lg shadow-[0_1px_4px_rgba(0,0,0,0.08)] w-full p-8 md:max-w-160 md:px-10 md:pt-10 md:pb-8 lg:px-20 lg:pt-15 lg:pb-12 xl:max-w-175 xl:px-22.5">
                    <div className="text-center mb-8">
                        <svg className="w-12 h-12 mb-6 mx-auto md:w-13 md:h-13 lg:w-13.5 lg:h-13.5" viewBox="0 0 124 124" fill="none">
                            <path d="M26.3996 78.3999C26.3996 84.8999 21.0996 90.1999 14.5996 90.1999C8.09961 90.1999 2.79961 84.8999 2.79961 78.3999C2.79961 71.8999 8.09961 66.5999 14.5996 66.5999H26.3996V78.3999Z" fill="#E01E5A" />
                            <path d="M32.2996 78.3999C32.2996 71.8999 37.5996 66.5999 44.0996 66.5999C50.5996 66.5999 55.8996 71.8999 55.8996 78.3999V109.6C55.8996 116.1 50.5996 121.4 44.0996 121.4C37.5996 121.4 32.2996 116.1 32.2996 109.6V78.3999Z" fill="#E01E5A" />
                            <path d="M44.0996 26.4001C37.5996 26.4001 32.2996 21.1001 32.2996 14.6001C32.2996 8.1001 37.5996 2.8001 44.0996 2.8001C50.5996 2.8001 55.8996 8.1001 55.8996 14.6001V26.4001H44.0996Z" fill="#36C5F0" />
                            <path d="M44.0996 32.2999C50.5996 32.2999 55.8996 37.5999 55.8996 44.0999C55.8996 50.5999 50.5996 55.8999 44.0996 55.8999H12.8996C6.39961 55.8999 1.09961 50.5999 1.09961 44.0999C1.09961 37.5999 6.39961 32.2999 12.8996 32.2999H44.0996Z" fill="#36C5F0" />
                            <path d="M97.5996 44.0999C97.5996 37.5999 102.9 32.2999 109.4 32.2999C115.9 32.2999 121.2 37.5999 121.2 44.0999C121.2 50.5999 115.9 55.8999 109.4 55.8999H97.5996V44.0999Z" fill="#2EB67D" />
                            <path d="M91.6996 44.0999C91.6996 50.5999 86.3996 55.8999 79.8996 55.8999C73.3996 55.8999 68.0996 50.5999 68.0996 44.0999V12.8999C68.0996 6.3999 73.3996 1.0999 79.8996 1.0999C86.3996 1.0999 91.6996 6.3999 91.6996 12.8999V44.0999Z" fill="#2EB67D" />
                            <path d="M79.8996 97.5999C86.3996 97.5999 91.6996 102.9 91.6996 109.4C91.6996 115.9 86.3996 121.2 79.8996 121.2C73.3996 121.2 68.0996 115.9 68.0996 109.4V97.5999H79.8996Z" fill="#ECB22E" />
                            <path d="M79.8996 91.7001C73.3996 91.7001 68.0996 86.4001 68.0996 79.9001C68.0996 73.4001 73.3996 68.1001 79.8996 68.1001H111.1C117.6 68.1001 122.9 73.4001 122.9 79.9001C122.9 86.4001 117.6 91.7001 111.1 91.7001H79.8996Z" fill="#ECB22E" />
                        </svg>
                        <h1 className="text-[28px] md:text-4xl lg:text-5xl xl:text-[52px] font-bold leading-tight text-[#1d1c1d] mb-3 tracking-tight">
                            Primero, introduce tu correo electrónico
                        </h1>
                        <p className="text-base md:text-[17px] lg:text-lg leading-normal text-[#1d1c1d] m-0">
                            Te sugerimos <strong className="font-bold">usar la dirección de correo electrónico que usas en el trabajo</strong>.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit(formSubmit)} className="mt-8">
                        <div className="mb-5">
                            <label htmlFor="email" className="block text-[15px] font-bold text-[#1d1c1d] mb-2 leading-snug">
                                Correo electrónico
                            </label>
                            <input
                                id="email"
                                type="email"
                                placeholder="nombre@empresa.com"
                                className={`w-full px-3 py-2.75 pb-3.25 text-lg leading-[1.33333333] border ${errors.email
                                        ? "border-[#e8912d] focus:shadow-[0_0_0_4px_rgba(232,145,45,0.3)]"
                                        : "border-[#868686] focus:border-[#1264a3] focus:shadow-[0_0_0_4px_rgba(29,155,209,0.3)]"
                                    } rounded transition-all duration-200 ease-in-out box-border font-inherit text-[#1d1c1d] placeholder:text-[#616061] focus:outline-none`}
                                {...register("email", { required: "Introduce una dirección de correo electrónico." })}
                            />
                            {errors.email && (
                                <p className="flex items-start gap-1.5 mt-2 text-[13px] text-[#e8912d] leading-snug">
                                    <i className="bi bi-info-circle-fill shrink-0 mt-px"></i>
                                    {errors.email.message}
                                </p>
                            )}
                        </div>

                        <div className="mb-5">
                            <label htmlFor="username" className="block text-[15px] font-bold text-[#1d1c1d] mb-2 leading-snug">
                                Nombre de usuario
                            </label>
                            <input
                                id="username"
                                type="text"
                                placeholder="Tu nombre de usuario"
                                className={`w-full px-3 py-2.75 pb-3.25 text-lg leading-[1.33333333] border ${errors.username
                                        ? "border-[#e8912d] focus:shadow-[0_0_0_4px_rgba(232,145,45,0.3)]"
                                        : "border-[#868686] focus:border-[#1264a3] focus:shadow-[0_0_0_4px_rgba(29,155,209,0.3)]"
                                    } rounded transition-all duration-200 ease-in-out box-border font-inherit text-[#1d1c1d] placeholder:text-[#616061] focus:outline-none`}
                                {...register("username", { required: "Introduce un nombre de usuario." })}
                            />
                            {errors.username && (
                                <p className="flex items-start gap-1.5 mt-2 text-[13px] text-[#e8912d] leading-snug">
                                    <i className="bi bi-info-circle-fill shrink-0 mt-px"></i>
                                    {errors.username.message}
                                </p>
                            )}
                        </div>

                        <div className="mb-5">
                            <label htmlFor="password" className="block text-[15px] font-bold text-[#1d1c1d] mb-2 leading-snug">
                                Contraseña
                            </label>
                            <input
                                id="password"
                                type="password"
                                placeholder="Introduce tu contraseña"
                                className={`w-full px-3 py-2.75 pb-3.25 text-lg leading-[1.33333333] border ${errors.password
                                        ? "border-[#e8912d] focus:shadow-[0_0_0_4px_rgba(232,145,45,0.3)]"
                                        : "border-[#868686] focus:border-[#1264a3] focus:shadow-[0_0_0_4px_rgba(29,155,209,0.3)]"
                                    } rounded transition-all duration-200 ease-in-out box-border font-inherit text-[#1d1c1d] placeholder:text-[#616061] focus:outline-none`}
                                {...register("password", { required: "Introduce una contraseña." })}
                            />
                            {errors.password && (
                                <p className="flex items-start gap-1.5 mt-2 text-[13px] text-[#e8912d] leading-snug">
                                    <i className="bi bi-info-circle-fill shrink-0 mt-px"></i>
                                    {errors.password.message}
                                </p>
                            )}
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-[#611f69] text-white text-lg font-bold px-5 py-3.5 pb-3.75 border-none rounded cursor-pointer mt-7 transition-all duration-100 ease-in-out font-inherit hover:bg-[#4a154b] hover:shadow-[0_1px_4px_rgba(0,0,0,0.3)] active:bg-[#350d36]"
                        >
                            Continuar
                        </button>

                        {registerError && (
                            <div className="flex items-start gap-3 p-4 rounded-lg mt-5 text-[15px] leading-snug bg-[#fff4f4] text-[#1d1c1d] border border-[#e8912d]">
                                <i className="bi bi-info-circle-fill shrink-0 mt-0.5"></i>
                                {registerError}
                            </div>
                        )}

                        {registerResponse && (
                            <div className="flex items-start gap-3 p-4 rounded-lg mt-5 text-[15px] leading-snug bg-[#f4fdf4] text-[#1d1c1d] border border-[#2eb67d]">
                                <i className="bi bi-check-lg shrink-0 mt-0.5"></i>
                                {registerResponse}
                            </div>
                        )}
                    </form>

                    <div className="text-center mt-8 pt-8 border-t border-[#e0e0e0]">
                        <p className="text-[15px] text-[#1d1c1d] m-0">
                            ¿Ya tienes una cuenta? <a href="/" className="text-[#1264a3] no-underline font-semibold hover:underline">Inicia sesión</a>
                        </p>
                    </div>
                </div>
            )}
        </section>
    );
};

export default RegisterScreen;
