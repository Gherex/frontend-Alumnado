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
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        }
      );

      const data = await response.json(); // Parsear respuesta como JSON

      if (response.ok) {
        localStorage.setItem("jwtToken", data.token); // Guardar token
        login("admin");
        navigate("/alumnado/alumnos");
      } else {
        setError(data.error || "Credenciales inválidas");
      }
    } catch (err) {
      if (err.message === "Failed to fetch") {
        setError(
          "No se pudo conectar al servidor. Inténtalo de nuevo más tarde."
        );
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGuest = () => {
    localStorage.removeItem("jwtToken"); // Limpiar token existente
    login("guest");
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
          <fieldset>
            <button type="submit">
              {loading ? (
                <CirculoDeCarga className="boton-de-carga" />
              ) : (
                "Iniciar Sesión"
              )}
            </button>
          </fieldset>
        </form>
        <button onClick={handleGuest}>Acceder como invitado</button>
      </div>
    </div>
  );
}

export default LoginPage;
