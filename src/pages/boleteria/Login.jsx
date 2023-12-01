import Swal from "sweetalert2";
import { authAPI } from "../../api/api";

export const Login = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;

    try {
      const credentials = { username, password };
      const user = await authAPI.login(credentials);
      localStorage.setItem("userId", user.userId);
      window.location.reload();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Usuario o contraseña incorrectos",
        confirmButtonText: "Aceptar",
      });
    }
  };

  return (
    <>
      <img
        src="/logo-miboleta-256.png"
        alt="logo"
        className="w-24 mx-auto mb-4 rounded-xl"
      />
      <div className="flex p-3">
        <div className="w-full max-w-md m-auto bg-gray-900 rounded-lg border-2 border-gray-700 py-10 px-8">
          <h1 className="text-4xl font-black text-gray-300 text-center mb-6">
            Iniciar sesión 🔐
          </h1>
          <form onSubmit={handleSubmit}>
            <div>
              <label
                className="text-gray-300 font-bold text-center"
                htmlFor="username"
              >
                Usuario
              </label>
              <input
                type="username"
                className={`rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 mb-4 mt-2`}
                placeholder="Ingresa tu Usuario"
                id="username"
                required
              />

              <div>
                <label
                  className="text-gray-300 font-bold text-center"
                  htmlFor="password"
                >
                  Contraseña
                </label>
                <input
                  type="password"
                  className={`rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 mb-4 mt-2`}
                  placeholder="ingresa tu contraseña"
                  id="password"
                  required
                />
              </div>
            </div>
            <button
              className={`w-full bg-blue-500 py-2 px-4 text-white rounded-lg mt-4`}
              type="submit"
            >
              Ingresar
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
