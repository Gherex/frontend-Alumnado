import { jwtDecode } from "jwt-decode";
import { useState } from "react";

function useLogin() {
  const [user, setUser] = useState(null); // Información del usuario (e.g., rol)
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Si el usuario está autenticado
  const [error, setError] = useState(null); // Guarda errores de autenticación

  // Función para manejar el login
  const login = async (username, password) => {
    try {
      setError(null); // Reinicia errores previos

      const response = await fetch(
        "https://app-alumnado-latest.onrender.com/alumnado/api/v1/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        }
      );

      if (!response.ok) {
        throw new Error("Credenciales inválidas");
      }

      const { token } = await response.json(); // Obtén el token de la respuesta

      // Decodifica el token si es un JWT
      const decodedToken = jwtDecode(token); // Extrae el payload del token
      console.log(decodedToken); // Verifica qué información contiene tu token

      // Guarda el usuario (ejemplo: rol) y marca como autenticado
      setUser({ role: decodedToken.role || "guest" }); // Ajusta según lo que tenga tu token
      setIsAuthenticated(true);

      // Guarda el token en el almacenamiento local
      sessionStorage.setItem("authToken", token);
    } catch (err) {
      setError(err.message);
      setIsAuthenticated(false);
    }
  };

  // Función para manejar el logout
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    sessionStorage.removeItem("authToken"); // Limpia el token del almacenamiento local
  };

  return {
    user, // Información del usuario actual
    isAuthenticated, // Si el usuario está autenticado
    error, // Errores de autenticación
    login, // Función para iniciar sesión
    logout, // Función para cerrar sesión
  };
}

export default useLogin;
