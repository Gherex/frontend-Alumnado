import useActions from "../../../../hooks/useActions";
import { useEffect } from "react";
import FormAgregarProfesor from "./FormAgregarProfesor";
import FormModificarProfesor from "./FormModificarProfesor";
import FormEliminarProfesor from "./FormEliminarProfesor";

function ProfesoresActions() {
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
    actualizarArrayIds("profesores");
  }, []);

  return (
    <div className="actions-container">
      <FormAgregarProfesor
        agregarFila={agregarFila}
        loading={loadingAgregar}
        error={errorAgregar}
      />
      <FormModificarProfesor
        modificarFila={modificarFila}
        loading={loadingModificar}
        error={errorModificar}
        arrayIDs={arrayIDs}
      />
      <FormEliminarProfesor
        eliminarFila={eliminarFila}
        loading={loadingEliminar}
        error={errorEliminar}
        arrayIDs={arrayIDs}
      />
    </div>
  );
}

export default ProfesoresActions;
