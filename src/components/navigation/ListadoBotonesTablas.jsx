import { Link } from "react-router-dom";

function ListadoBotonesTablas() {
  return (
    <nav className="lista-de-tablas">
      <ul>
        <li>
          <Link
            to="/alumnado/alumnos"
            className="botones-tablas"
            draggable="false"
          >
            Alumnos
          </Link>
        </li>
        <li>
          <Link
            to="/alumnado/profesores"
            className="botones-tablas"
            draggable="false"
          >
            Profesores
          </Link>
        </li>
        <li>
          <Link
            to="/alumnado/materias"
            className="botones-tablas"
            draggable="false"
          >
            Materias
          </Link>
        </li>
        <li>
          <Link
            to="/alumnado/inscripciones"
            className="botones-tablas"
            draggable="false"
          >
            Inscripciones
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default ListadoBotonesTablas;
