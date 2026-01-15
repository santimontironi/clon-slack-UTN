import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import Loader from "../../components/Loader";
import { useLogin } from "../../hook/useLogin";

const LoginScreen = () => {
  const { user, loginSession } = useContext(AuthContext);
  const { login, loading, error } = useLogin();

  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/home");
    }
  }, [user, navigate]);

  async function formSubmit(data) {
    try {
      const res = await login(data);
      loginSession(res.data.user);
    } catch (err) {
      reset();
    }
  }

  if (loading) return <Loader />;

  return (
    <section>
      <h1>Login</h1>

      <form onSubmit={handleSubmit(formSubmit)}>
        <div>
          <label htmlFor="identifier">Usuario o email</label>
          <input
            id="identifier"
            {...register("identifier", { required: "Campo obligatorio" })}
          />
          {errors.identifier && <p>{errors.identifier.message}</p>}
        </div>

        <div>
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            {...register("password", { required: "Campo obligatorio" })}
          />
          {errors.password && <p>{errors.password.message}</p>}
        </div>

        <button type="submit">Iniciar sesión</button>
      </form>

      {error && <p>{error}</p>}
    </section>
  );
};

export default LoginScreen;