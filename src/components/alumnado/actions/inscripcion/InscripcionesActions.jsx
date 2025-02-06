import useActions from "../../../../hooks/useActions";
import { useEffect, useState } from "react";
import FormAgregarInscripcion from "./FormAgregarInscripcion";
import FormModificarInscripcion from "./FormModificarInscripcion";
import FormEliminarInscripcion from "./FormEliminarInscripcion";

function InscripcionesActions() {
  const [inscripcionesIds, setInscripcionesIds] = useState([]);
  const [alumnosIds, setAlumnosIds] = useState([]);
  const [materiasIds, setMateriasIds] = useState([]);

  const {
    agregarFila,
    modificarFila,
    eliminarFila,
    getIdsTabla,
    getFila,
    loadingAgregar,
    loadingModificar,
    loadingEliminar,
    errorAgregar,
    errorModificar,
    errorEliminar,
  } = useActions();

  async function actualizarInscripcionesIds() {
    const inscripIds = await getIdsTabla("inscripciones");
    if (inscripIds) {
      setInscripcionesIds(inscripIds);
    }
  }

  async function actualizarMateriasIds() {
    const matIds = await getIdsTabla("materias");
    if (matIds) {
      setMateriasIds(matIds);
    }
  }

  async function actualizarAlumnosIds() {
    const aluIds = await getIdsTabla("alumnos");
    if (aluIds) {
      setAlumnosIds(aluIds);
    }
  }

  // Cargar IDs al montar el componente
  useEffect(() => {
    actualizarInscripcionesIds();
    actualizarMateriasIds();
    actualizarAlumnosIds();
  }, []);

  return (
    <div className="actions-container">
      <FormAgregarInscripcion
        agregarFila={agregarFila}
        getFila={getFila}
        actualizarInscripcionesIds={actualizarInscripcionesIds}
        loading={loadingAgregar}
        error={errorAgregar}
        inscripcionesIds={inscripcionesIds}
        alumnosIds={alumnosIds}
        materiasIds={materiasIds}
      />
      <FormModificarInscripcion
        modificarFila={modificarFila}
        getFila={getFila}
        loading={loadingModificar}
        error={errorModificar}
        inscripcionesIds={inscripcionesIds}
        alumnosIds={alumnosIds}
        materiasIds={materiasIds}
      />
      <FormEliminarInscripcion
        eliminarFila={eliminarFila}
        actualizarInscripcionesIds={actualizarInscripcionesIds}
        loading={loadingEliminar}
        error={errorEliminar}
        inscripcionesIds={inscripcionesIds}
      />
    </div>
  );
}

export default InscripcionesActions;
