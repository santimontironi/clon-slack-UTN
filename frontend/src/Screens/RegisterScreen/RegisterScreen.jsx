import { useForm } from "react-hook-form";
import { useRegister } from "../../hook/useRegister";
import Loader from "../../components/Loader";

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
        <section>
            <div>
                <h1>Register</h1>

                <form onSubmit={handleSubmit(formSubmit)}>
                    <div>
                        <label>Email</label>
                        <input
                            type="email"
                            {...register("email", { required: "Email obligatorio" })}
                        />
                        {errors.email && <p>{errors.email.message}</p>}
                    </div>

                    <div>
                        <label>Usuario</label>
                        <input
                            {...register("username", { required: "Usuario obligatorio" })}
                        />
                        {errors.username && <p>{errors.username.message}</p>}
                    </div>

                    <div>
                        <label>Contraseña</label>
                        <input
                            type="password"
                            {...register("password", { required: "Contraseña obligatoria" })}
                        />
                        {errors.password && <p>{errors.password.message}</p>}
                    </div>

                    <button type="submit">Registrarse</button>
                </form>

                {error && <p>{error}</p>}
                {response && <p>{response}</p>}
            </div>
        </section>
    );
};

export default RegisterScreen;
