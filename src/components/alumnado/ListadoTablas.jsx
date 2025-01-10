import "../../css/alumnado.css";

function ListadoTablas({ setTabla }) {
  const handleClick = (tabla) => {
    setTabla(tabla); // Actualizar el estado en el padre
  };

  return (
    <div className="lista-de-tablas">
      <ul>
        <li>
          <button onClick={() => handleClick("alumnos")}>Alumnos</button>
        </li>
        <li>
          <button onClick={() => handleClick("profesores")}>Profesores</button>
        </li>
        <li>
          <button onClick={() => handleClick("materias")}>Materias</button>
        </li>
        <li>
          <button onClick={() => handleClick("inscripciones")}>
            Inscripciones
          </button>
        </li>
      </ul>
    </div>
  );
}

export default ListadoTablas;
