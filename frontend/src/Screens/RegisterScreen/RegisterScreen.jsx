import { useForm } from "react-hook-form";
import { useRegister } from "../../hook/useRegister";
import Loader from "../../components/Loader";
import "./RegisterScreen.css";

const RegisterScreen = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { register: registerUser, loading, error, response } = useRegister();

    async function formSubmit(data) {
        try {
            await registerUser(data);
            reset();
        } catch {
            reset();
        }
    }

    if (loading) return <Loader />;

    return (
        <section className="register-container">
            <div className="register-card">
                <div className="register-header">
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
                    <h1>Primero, introduce tu correo electrónico</h1>
                    <p className="register-subtitle">
                        Te sugerimos <strong>usar la dirección de correo electrónico que usas en el trabajo</strong>.
                    </p>
                </div>

                <form onSubmit={handleSubmit(formSubmit)} className="register-form">
                    <div className="form-group">
                        <label htmlFor="email">Correo electrónico</label>
                        <input
                            id="email"
                            type="email"
                            placeholder="nombre@empresa.com"
                            className={errors.email ? "input-error" : ""}
                            {...register("email", { required: "Introduce una dirección de correo electrónico." })}
                        />
                        {errors.email && (
                            <p className="error-message">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <path d="M8 0C3.6 0 0 3.6 0 8C0 12.4 3.6 16 8 16C12.4 16 16 12.4 16 8C16 3.6 12.4 0 8 0ZM8 12C7.4 12 7 11.6 7 11C7 10.4 7.4 10 8 10C8.6 10 9 10.4 9 11C9 11.6 8.6 12 8 12ZM9 9H7V4H9V9Z" fill="#E8912D" />
                                </svg>
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="username">Nombre de usuario</label>
                        <input
                            id="username"
                            type="text"
                            placeholder="Tu nombre de usuario"
                            className={errors.username ? "input-error" : ""}
                            {...register("username", { required: "Introduce un nombre de usuario." })}
                        />
                        {errors.username && (
                            <p className="error-message">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <path d="M8 0C3.6 0 0 3.6 0 8C0 12.4 3.6 16 8 16C12.4 16 16 12.4 16 8C16 3.6 12.4 0 8 0ZM8 12C7.4 12 7 11.6 7 11C7 10.4 7.4 10 8 10C8.6 10 9 10.4 9 11C9 11.6 8.6 12 8 12ZM9 9H7V4H9V9Z" fill="#E8912D" />
                                </svg>
                                {errors.username.message}
                            </p>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Contraseña</label>
                        <input
                            id="password"
                            type="password"
                            placeholder="Introduce tu contraseña"
                            className={errors.password ? "input-error" : ""}
                            {...register("password", { required: "Introduce una contraseña." })}
                        />
                        {errors.password && (
                            <p className="error-message">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <path d="M8 0C3.6 0 0 3.6 0 8C0 12.4 3.6 16 8 16C12.4 16 16 12.4 16 8C16 3.6 12.4 0 8 0ZM8 12C7.4 12 7 11.6 7 11C7 10.4 7.4 10 8 10C8.6 10 9 10.4 9 11C9 11.6 8.6 12 8 12ZM9 9H7V4H9V9Z" fill="#E8912D" />
                                </svg>
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    <button type="submit" className="submit-button">
                        Continuar
                    </button>

                    {error && (
                        <div className="alert alert-error">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M8 0C3.6 0 0 3.6 0 8C0 12.4 3.6 16 8 16C12.4 16 16 12.4 16 8C16 3.6 12.4 0 8 0ZM8 12C7.4 12 7 11.6 7 11C7 10.4 7.4 10 8 10C8.6 10 9 10.4 9 11C9 11.6 8.6 12 8 12ZM9 9H7V4H9V9Z" fill="#E01E5A" />
                            </svg>
                            {error}
                        </div>
                    )}

                    {response && (
                        <div className="alert alert-success">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M8 0C3.6 0 0 3.6 0 8C0 12.4 3.6 16 8 16C12.4 16 16 12.4 16 8C16 3.6 12.4 0 8 0ZM6.4 12L2 7.6L3.4 6.2L6.4 9.2L12.6 3L14 4.4L6.4 12Z" fill="#2EB67D" />
                            </svg>
                            {response}
                        </div>
                    )}
                </form>

                <div className="register-footer">
                    <p>¿Ya tienes una cuenta? <a href="/">Inicia sesión</a></p>
                </div>
            </div>
        </section>
    );
};

export default RegisterScreen;