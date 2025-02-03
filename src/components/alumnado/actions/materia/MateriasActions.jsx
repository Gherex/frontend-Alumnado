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
    obtenerProfesor,
  } = useActions();

  async function setearProfesoresID() {
    try {
      const response = await fetch(
        `https://app-alumnado-latest.onrender.com/alumnado/api/v1/profesores`
      );
      if (response.ok) {
        const data = await response.json();
        const idsTabla = data.map((fila) => {
          const idKey = Object.keys(fila).find((key) => key.startsWith("id_"));
          return idKey ? fila[idKey] : null;
        });
        setProfesoresID(idsTabla.filter(Boolean));
      }
    } catch (err) {
      console.error("Error al cargar los IDs de Profesores. ", err);
    }
  }

  // Cargar IDs al montar el componente
  useEffect(() => {
    actualizarArrayIds("materias");
    setearProfesoresID();
  }, []);

  return (
    <div className="actions-container">
      <FormAgregarMateria
        agregarFila={agregarFila}
        loading={loadingAgregar}
        error={errorAgregar}
        arrayIDs={arrayIDs}
        profesoresID={profesoresID}
        obtenerProfesor={obtenerProfesor}
      />
      <FormModificarMateria
        modificarFila={modificarFila}
        loading={loadingModificar}
        error={errorModificar}
        arrayIDs={arrayIDs}
        obtenerProfesor={obtenerProfesor}
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
