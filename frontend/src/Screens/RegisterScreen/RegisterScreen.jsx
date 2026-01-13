import { useForm } from "react-hook-form";
import { registerService } from "../../services/authService";
import useRequest from "../../hooks/useRequest";

const RegisterScreen = () => {

    const { register, handleSubmit, reset, formState: { errors } } = useForm()

    const { loading, sendRequest, error, response } = useRequest()

    async function formSubmit(data) {
        sendRequest(() => {
            return registerService(data)
        })
        reset()
    }

    return (
        <section>
            {loading ? (<p>Loading...</p>) : (
                <div>
                    <h1>RegisterScreen</h1>
                    <form onSubmit={handleSubmit(formSubmit)}>
                        <div>
                            <label htmlFor="email">Email</label>
                            <input type="email" {...register("email", { required: true })} id="email" name="email" placeholder="Email" />
                            {errors.email && <p>{errors.email.message}</p>}
                        </div>
                        <div>
                            <label htmlFor="username">Nombre de usuario</label>
                            <input type="text" {...register("username", { required: true })} id="username" name="username" placeholder="Username" />
                            {errors.username && <p>{errors.username.message}</p>}
                        </div>
                        <div>
                            <label htmlFor="password">Contraseña</label>
                            <input type="password" {...register("password", { required: true })} id="password" name="password" placeholder="Password" />
                            {errors.password && <p>{errors.password.message}</p>}
                        </div>

                        <button type="submit">Registrarse</button>
                    </form>

                    {error && <p>{error}</p>}

                    {response && <p>{response}</p>}
                </div>
            )}
        </section>
    )
}

export default RegisterScreen