import "../../css/navigation.css";
import ListadoBotonesTablas from "./ListadoBotonesTablas";
import { useNavigate } from "react-router-dom";

function BarraDeNavegacion({ isAdmin, onLogout }) {
  const navigate = useNavigate();

  const handleLoginToggle = () => {
    if (isAdmin) {
      onLogout(); // Acción de logout
    } else {
      navigate("/"); // Redirige al login
    }
  };

  return (
    <header className="barra-de-navegacion">
      {/* Primera fila */}
      <div className="navegacion-principal">
        <img
          src="/gherex_green_code_circular.png"
          alt="Logo Gherex Green Code para Alumnado App"
          className="logo"
          draggable="false"
        />
        <h1 className="titulo-app">Alumnado App</h1>
        <button onClick={handleLoginToggle} className="boton-login">
          {isAdmin ? "Log out" : "Log in"}
        </button>
      </div>

      {/* Segunda fila: Navegación secundaria */}
      <ListadoBotonesTablas />
    </header>
  );
}

export default BarraDeNavegacion;
