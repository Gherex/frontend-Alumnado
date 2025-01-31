import useActions from "../../../../hooks/useActions";
import FormAgregarAlumno from "./FormAgregarAlumno";
import FormModificarAlumno from "./FormModificarAlumno";
import FormEliminarAlumno from "./FormEliminarAlumno";

function AlumnosActions() {
  const { agregarFila, modificarFila, eliminarFila, arrayIDs, loading, error } =
    useActions();

  return (
    <div className="actions-container">
      <FormAgregarAlumno
        agregarFila={agregarFila}
        loading={loading}
        error={error}
      />
      <FormModificarAlumno
        modificarFila={modificarFila}
        loading={loading}
        error={error}
        arrayIDs={arrayIDs}
      />
      <FormEliminarAlumno
        eliminarFila={eliminarFila}
        loading={loading}
        error={error}
        arrayIDs={arrayIDs}
      />
    </div>
  );
}

export default AlumnosActions;
