import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  // Estados para almacenar el email, la contraseña y posibles errores
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  // Función asíncrona que se ejecuta al enviar el formulario
  const handleSubmit = async (e) => {
    e.preventDefault(); // Evita que el formulario se recargue por defecto

    // Construye el objeto de credenciales que se enviará a la API
    const credentials = { email, password };

    try {
      // Llama a la API para autenticar al usuario.
      // Se envía una solicitud POST a la ruta del backend para el login.
      const response = await fetch("http://localhost:5000/api/users/login", {
        method: "POST", // Usamos el método POST
        headers: {
          "Content-Type": "application/json", // Indicamos que enviamos JSON
        },
        body: JSON.stringify(credentials), // Convertimos las credenciales a JSON
      });

      // Convertir la respuesta de la API a formato JSON
      const data = await response.json();

      if (response.ok) {
        // Si la autenticación es exitosa, se espera recibir un objeto con la información del usuario y un token
        // Guardamos los datos del usuario y el token en localStorage
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", data.token);

        // Redirigir al usuario a la página de perfil
        navigate("/profile");
      } else {
        // Si la respuesta no es exitosa, mostramos el error recibido de la API
        setErrorMessage(data.error || "Error en la autenticación");
      }
    } catch (error) {
      // Manejo de errores de red o de conexión
      console.error("Error al iniciar sesión:", error);
      setErrorMessage("Error al conectar con el servidor");
    }
  };

  return (
    <div className="container">
      <h2>Iniciar Sesión</h2>
      {/* Mostrar mensaje de error si existe */}
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Contraseña
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Ingresar
        </button>
      </form>
    </div>
  );
};

export default Login;
