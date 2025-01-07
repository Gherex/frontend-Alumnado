import "../css/Login.css";
import { useState } from "react";

function Login({ setRole }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await fetch("http://tu-backend.com/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json(); // Aquí el backend debería devolver un token
        const { token, role } = data;

        // Guarda el token en sessionStorage
        sessionStorage.setItem("authToken", token);

        // Establece el rol en el estado del frontend
        setRole(role); // role será 'admin' o 'guest'
      } else {
        alert("Credenciales inválidas");
      }
    } catch (error) {
      console.error("Error durante el inicio de sesión:", error);
    }
  };

  const handleGuestAccess = () => {
    setRole("guest"); // Invita sin token
  };

  return (
    <div className="login-container">
      <div className="login">
        <h1>Iniciar sesión</h1>
        <input
          type="text"
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Ingresar</button>
        <button onClick={handleGuestAccess}>Acceder como invitado</button>
      </div>
    </div>
  );
}

export default Login;
