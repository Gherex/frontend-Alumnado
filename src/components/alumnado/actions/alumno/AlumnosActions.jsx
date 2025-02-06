import useActions from "../../../../hooks/useActions";
import FormAgregarAlumno from "./FormAgregarAlumno";
import FormModificarAlumno from "./FormModificarAlumno";
import FormEliminarAlumno from "./FormEliminarAlumno";
import { useEffect, useState } from "react";

function AlumnosActions() {
  const [alumnosIds, setAlumnosIds] = useState([]);

  const {
    agregarFila,
    modificarFila,
    eliminarFila,
    getIdsTabla,
    loadingAgregar,
    loadingModificar,
    loadingEliminar,
    errorAgregar,
    errorModificar,
    errorEliminar,
  } = useActions();

  async function actualizarAlumnosIds() {
    const aluIds = await getIdsTabla("alumnos");
    if (aluIds) {
      setAlumnosIds(aluIds);
    }
  }

  // Cargar IDs al montar el componente
  useEffect(() => {
    actualizarAlumnosIds();
  }, []);

  return (
    <div className="actions-container">
      <FormAgregarAlumno
        agregarFila={agregarFila}
        actualizarAlumnosIds={actualizarAlumnosIds}
        loading={loadingAgregar}
        error={errorAgregar}
        alumnosIds={alumnosIds}
      />
      <FormModificarAlumno
        modificarFila={modificarFila}
        loading={loadingModificar}
        error={errorModificar}
        alumnosIds={alumnosIds}
      />
      <FormEliminarAlumno
        eliminarFila={eliminarFila}
        actualizarAlumnosIds={actualizarAlumnosIds}
        loading={loadingEliminar}
        error={errorEliminar}
        alumnosIds={alumnosIds}
      />
    </div>
  );
}

export default AlumnosActions;
