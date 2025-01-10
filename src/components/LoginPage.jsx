import { useState } from "react";
import useLogin from "../hooks/useLogin";
import "../css/login.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

function LoginPage({ setRole }) {
  const { login, error, isAuthenticated, user } = useLogin();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [verPassword, setVerPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    login(username, password).then((result) => {
      if (result?.role) {
        setRole(result.role); // Asigna el rol devuelto por el login
      }
    });
  };

  const togglePasswordVisibility = () => {
    setVerPassword(!verPassword);
  };

  const handleGuest = () => {
    setRole("guest"); // Define el rol como 'guest' al entrar como invitado
  };

  if (isAuthenticated) {
    return (
      <h1>
        Bienvenido, {user.name}! Tu rol es: {user.role}
      </h1>
    );
  }

  return (
    <div className="login-container">
      <div className="login">
        <h2>Bienvenido</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            pattern="[a-zA-Z]+"
            minLength="4"
            maxLength="6"
          />
          <div>
            <input
              type={verPassword ? "text" : "password"}
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              pattern="[a-zA-Z0-9]+"
              minLength="14"
              maxLength="20"
            />
            {verPassword ? (
              <FontAwesomeIcon
                className="input-icon"
                icon={faEye}
                onClick={togglePasswordVisibility}
              />
            ) : (
              <FontAwesomeIcon
                className="input-icon"
                icon={faEyeSlash}
                onClick={togglePasswordVisibility}
              />
            )}
          </div>
          <button type="submit">Iniciar Sesión</button>
        </form>
        <button onClick={handleGuest}>Acceder como invitado</button>
      </div>
    </div>
  );
}

export default LoginPage;
