import "../css/login.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import CirculoDeCarga from "./CirculoDeCarga";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [verPassword, setVerPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
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

      // Si la respuesta es exitosa, el backend ya ha configurado la cookie JWT
      login("admin"); // Solo guardamos el rol en el contexto
      navigate("/alumnado/alumnos");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGuest = () => {
    login("guest"); // Acá solo guardo el rol como "guest"
    navigate("/alumnado/alumnos");
  };

  const togglePasswordVisibility = () => {
    setVerPassword(!verPassword);
  };

  return (
    <div className="login-container">
      {error && <p>Error: {error}</p>}
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
          <button type="submit">
            {loading ? (
              <CirculoDeCarga className="boton-de-carga-submit" />
            ) : (
              "Iniciar Sesión"
            )}
          </button>
        </form>
        <button onClick={handleGuest}>Acceder como invitado</button>
      </div>
    </div>
  );
}

export default LoginPage;
