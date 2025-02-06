import useActions from "../../../../hooks/useActions";
import { useEffect, useState } from "react";
import FormAgregarProfesor from "./FormAgregarProfesor";
import FormModificarProfesor from "./FormModificarProfesor";
import FormEliminarProfesor from "./FormEliminarProfesor";

function ProfesoresActions() {
  const [profesoresIds, setProfesoresIds] = useState([]);

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

  async function actualizarProfesoresIds() {
    const profeIds = await getIdsTabla("profesores");
    if (profeIds) {
      setProfesoresIds(profeIds);
    }
  }

  // Cargar IDs al montar el componente
  useEffect(() => {
    actualizarProfesoresIds();
  }, []);

  return (
    <div className="actions-container">
      <FormAgregarProfesor
        agregarFila={agregarFila}
        actualizarProfesoresIds={actualizarProfesoresIds}
        loading={loadingAgregar}
        error={errorAgregar}
      />
      <FormModificarProfesor
        modificarFila={modificarFila}
        loading={loadingModificar}
        error={errorModificar}
        profesoresIds={profesoresIds}
      />
      <FormEliminarProfesor
        eliminarFila={eliminarFila}
        actualizarProfesoresIds={actualizarProfesoresIds}
        loading={loadingEliminar}
        error={errorEliminar}
        profesoresIds={profesoresIds}
      />
    </div>
  );
}

export default ProfesoresActions;
