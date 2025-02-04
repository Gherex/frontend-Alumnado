import useActions from "../../../../hooks/useActions";
import { useEffect, useState } from "react";
import FormAgregarMateria from "./FormAgregarMateria";
import FormModificarMateria from "./FormModificarMateria";
import FormEliminarMateria from "./FormEliminarMateria";

function MateriasActions() {
  const [profesoresID, setProfesoresID] = useState([]);

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
    obtenerIDsTabla,
    obtenerFila,
  } = useActions();

  useEffect(() => {
    const cargarIDs = async () => {
      actualizarArrayIds("materias");
      const ids = await obtenerIDsTabla("profesores");
      setProfesoresID(ids);
    };
    cargarIDs();
  }, []);

  return (
    <div className="actions-container">
      <FormAgregarMateria
        agregarFila={agregarFila}
        loading={loadingAgregar}
        error={errorAgregar}
        arrayIDs={arrayIDs}
        profesoresID={profesoresID}
        obtenerFila={obtenerFila}
      />
      <FormModificarMateria
        modificarFila={modificarFila}
        loading={loadingModificar}
        error={errorModificar}
        arrayIDs={arrayIDs}
      />
      <FormEliminarMateria
        eliminarFila={eliminarFila}
        loading={loadingEliminar}
        error={errorEliminar}
        arrayIDs={arrayIDs}
      />
    </div>
  );
}

export default MateriasActions;
