import { useContext, useEffect } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import Loader from "../../../components/Loader";

const LoginScreen = () => {

  const { loading, loginUser, user, error, response } = useContext(AuthContext)

  const { register, handleSubmit, reset, formState: { errors } } = useForm()

  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      navigate('/home')
    }
  }, [user, navigate])

  async function formSubmit(data) {
    try {
      await loginUser(data)
    } catch (error) {
      console.log(error)
      reset()
    }

  }

  return (
    <section>
      {loading.login ? <Loader /> : (
        <div>
          <h1>LoginScreen</h1>
          <form onSubmit={handleSubmit(formSubmit)}>
            <div>
              <label htmlFor="identifier">Nombre de usuario o email</label>
              <input type="text" {...register("identifier", { required: true })} id="identifier" name="identifier" placeholder="Nombre de usuario o email" />
              {errors.identifier && <p>{errors.identifier.message}</p>}
            </div>
            <div>
              <label htmlFor="password">Contraseña</label>
              <input type="password" {...register("password", { required: true })} id="password" name="password" placeholder="Password" />
              {errors.password && <p>{errors.password.message}</p>}
            </div>
            <button type="submit">Iniciar sesión</button>
          </form>

          {error.login && <p>{error.login}</p>}
          {response.login && <p>{response.login}</p>}
        </div>
      )}
    </section>
  )
}

export default LoginScreen