import useActions from "../../../../hooks/useActions";
import { useEffect, useState } from "react";
import FormAgregarInscripcion from "./FormAgregarInscripcion";
import FormModificarInscripcion from "./FormModificarInscripcion";
import FormEliminarInscripcion from "./FormEliminarInscripcion";

function InscripcionesActions() {
  const [alumnosID, setAlumnosID] = useState([]);
  const [materiasID, setMateriasID] = useState([]);

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
    obtenerFila,
    obtenerIDsTabla,
  } = useActions();

  useEffect(() => {
    const cargarIDs = async () => {
      actualizarArrayIds("inscripciones");
      const AluIds = await obtenerIDsTabla("alumnos");
      setAlumnosID(AluIds);
      const MatIds = await obtenerIDsTabla("materias");
      setMateriasID(MatIds);
    };
    cargarIDs();
  }, []);

  return (
    <div className="actions-container">
      <FormAgregarInscripcion
        agregarFila={agregarFila}
        loading={loadingAgregar}
        error={errorAgregar}
        arrayIDs={arrayIDs}
        alumnosID={alumnosID}
        materiasID={materiasID}
        obtenerFila={obtenerFila}
      />
      <FormModificarInscripcion
        modificarFila={modificarFila}
        loading={loadingModificar}
        error={errorModificar}
        arrayIDs={arrayIDs}
        obtenerFila={obtenerFila}
        alumnosID={alumnosID}
        materiasID={materiasID}
      />
      <FormEliminarInscripcion
        eliminarFila={eliminarFila}
        loading={loadingEliminar}
        error={errorEliminar}
        arrayIDs={arrayIDs}
      />
    </div>
  );
}

export default InscripcionesActions;
