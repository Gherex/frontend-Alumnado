import "../css/login.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [verPassword, setVerPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://app-alumnado-latest.onrender.com/alumnado/api/v1/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }), // Enviar credenciales
          credentials: "include", // Permite el envío de cookies o credenciales
        }
      );
      if (!response.ok) throw new Error("Credenciales inválidas");

      const { token } = await response.json(); // Obtener el token de la respuesta
      login("admin", token); // Guardamos el rol y el token
      navigate("/alumnado");
    } catch (err) {
      alert(err.message); // Mostrar error si no se puede hacer login
    }
  };

  const handleGuest = () => {
    login("guest"); // Solo guardamos el rol como "guest"
    navigate("/alumnado");
  };

  const togglePasswordVisibility = () => {
    setVerPassword(!verPassword);
  };

  return (
    <div className="login-container">
      <div className="login">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Usuario"
          />
          <div className="password-input">
            <input
              type={verPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña"
            />
            <FontAwesomeIcon
              className="password-icon"
              icon={verPassword ? faEye : faEyeSlash}
              onClick={togglePasswordVisibility}
            />
          </div>
          <button type="submit">Iniciar Sesión</button>
        </form>
        <button onClick={handleGuest}>Acceder como invitado</button>
      </div>
    </div>
  );
}

export default LoginPage;
