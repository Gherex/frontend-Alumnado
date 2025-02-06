import useActions from "../../../../hooks/useActions";
import { useEffect, useState } from "react";
import FormAgregarMateria from "./FormAgregarMateria";
import FormModificarMateria from "./FormModificarMateria";
import FormEliminarMateria from "./FormEliminarMateria";

function MateriasActions() {
  const [materiasIds, setMateriasIds] = useState([]);
  const [profesoresIds, setProfesoresIds] = useState([]);

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

  async function actualizarMateriasIds() {
    const matIds = await getIdsTabla("materias");
    if (matIds) {
      setMateriasIds(matIds);
    }
  }

  async function actualizarProfesoresIds() {
    const profeIds = await getIdsTabla("profesores");
    if (profeIds) {
      setProfesoresIds(profeIds);
    }
  }

  // Cargar IDs al montar el componente
  useEffect(() => {
    actualizarMateriasIds();
    actualizarProfesoresIds();
  }, []);

  return (
    <div className="actions-container">
      <FormAgregarMateria
        agregarFila={agregarFila}
        getFila={getFila}
        actualizarMateriasIds={actualizarMateriasIds}
        loading={loadingAgregar}
        error={errorAgregar}
        materiasIds={materiasIds}
        profesoresIds={profesoresIds}
      />
      <FormModificarMateria
        modificarFila={modificarFila}
        loading={loadingModificar}
        error={errorModificar}
        materiasIds={materiasIds}
      />
      <FormEliminarMateria
        eliminarFila={eliminarFila}
        actualizarMateriasIds={actualizarMateriasIds}
        loading={loadingEliminar}
        error={errorEliminar}
        materiasIds={materiasIds}
      />
    </div>
  );
}

export default MateriasActions;
