import useActions from "../../../../hooks/useActions";
import FormAgregarAlumno from "./FormAgregarAlumno";
import FormModificarAlumno from "./FormModificarAlumno";
import FormEliminarAlumno from "./FormEliminarAlumno";
import { useEffect } from "react";

function AlumnosActions() {
  const {
    agregarFila,
    modificarFila,
    eliminarFila,
    arrayIDs,
    loadingAgregar,
    loadingModificar,
    loadingEliminar,
    errorAgregar,
    errorModificar,
    errorEliminar,
    actualizarArrayIds,
  } = useActions();

  // Cargar IDs al montar el componente
  useEffect(() => {
    actualizarArrayIds("alumnos");
  }, []);

  return (
    <div className="actions-container">
      <FormAgregarAlumno
        agregarFila={agregarFila}
        loading={loadingAgregar}
        error={errorAgregar}
      />
      <FormModificarAlumno
        modificarFila={modificarFila}
        loading={loadingModificar}
        error={errorModificar}
        arrayIDs={arrayIDs}
      />
      <FormEliminarAlumno
        eliminarFila={eliminarFila}
        loading={loadingEliminar}
        error={errorEliminar}
        arrayIDs={arrayIDs}
      />
    </div>
  );
}

export default AlumnosActions;
