import { useAuth } from "../../context/AuthProvider";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import AuthenticatedActions from "./AuthenticatedActions";
import BarraDeNavegacion from "../navigation/BarraNavegacion";
import Footer from "../navigation/Footer";
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

  // Determina la tabla actual según la ruta en la URL
  const tablaActual = location.pathname.split("/").pop();

  return (
    <div className="app-container">
      <BarraDeNavegacion isAdmin={isAdmin} onLogout={handleLogout} />
      <main className="alumnado-container">
        {/* Renderiza las subrutas */}
        <Outlet />
        {isAdmin ? <AuthenticatedActions tabla={tablaActual} /> : null}
      </main>
      <Footer />
    </div>
  );
}

export default AlumnadoPage;
