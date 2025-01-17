import "../../css/alumnado.css";
import { useNavigate } from "react-router-dom";

function ListadoTablas({ setTabla }) {
  const navigate = useNavigate(); // Hook para redirigir a rutas

  const handleNavigation = (tabla) => {
    setTabla(tabla);
    navigate(`/alumnado/${tabla}`); // Navega a la ruta correspondiente
  };

  return (
    <div className="lista-de-tablas">
      <ul>
        <li>
          <button onClick={() => handleNavigation("alumnos")}>Alumnos</button>
        </li>
        <li>
          <button onClick={() => handleNavigation("profesores")}>
            Profesores
          </button>
        </li>
        <li>
          <button onClick={() => handleNavigation("materias")}>Materias</button>
        </li>
        <li>
          <button onClick={() => handleNavigation("inscripciones")}>
            Inscripciones
          </button>
        </li>
      </ul>
    </div>
  );
}

export default ListadoTablas;
