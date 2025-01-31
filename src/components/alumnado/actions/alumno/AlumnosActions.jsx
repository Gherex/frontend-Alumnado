import useActions from "../../../../hooks/useActions";
import FormAgregarAlumno from "./FormAgregarAlumno";
import FormEliminarAlumno from "./FormEliminarAlumno";
import FormModificarAlumno from "./FormModificarAlumno";

function AlumnosActions() {
  const { agregarFila, modificarFila, eliminarFila, loading, error, arrayIDs } =
    useActions();

  return (
    <div className="acciones-container">
      <FormAgregarAlumno props={(agregarFila, loading, error)} />
      <FormModificarAlumno props={(modificarFila, loading, error, arrayIDs)} />
      <FormEliminarAlumno props={(eliminarFila, loading, error, arrayIDs)} />
    </div>
  );
}

export default AlumnosActions;
