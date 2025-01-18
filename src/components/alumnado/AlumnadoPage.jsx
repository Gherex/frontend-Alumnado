import { useAuth } from "../../context/AuthProvider";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import AuthenticatedActions from "./AuthenticatedActions";
import BarraDeNavegacion from "../navigation/BarraNavegacion";
import "../../css/alumnado.css";

function AlumnadoPage() {
  const { role, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const isAdmin = role === "admin";

  const handleLogout = () => {
    logout(); // Limpia la autenticación
    navigate("/"); // Redirige al login
  };

  // Determina la tabla actual según la ruta
  const tablaActual = location.pathname.split("/").pop();

  return (
    <div className="alumnado-container">
      <BarraDeNavegacion isAdmin={isAdmin} onLogout={handleLogout} />
      {/* Renderiza las subrutas */}
      <Outlet />
      {isAdmin ? <AuthenticatedActions tabla={tablaActual} /> : null}
    </div>
  );
}

export default AlumnadoPage;
