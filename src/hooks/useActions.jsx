import { useState } from "react";

const useActions = () => {
  // Estados separados para cada acción
  const [loadingAgregar, setLoadingAgregar] = useState(false);
  const [loadingModificar, setLoadingModificar] = useState(false);
  const [loadingEliminar, setLoadingEliminar] = useState(false);

  const [errorAgregar, setErrorAgregar] = useState(null);
  const [errorModificar, setErrorModificar] = useState(null);
  const [errorEliminar, setErrorEliminar] = useState(null);

  const [arrayIDs, setArrayIDs] = useState([]);

  const actualizarArrayIds = async (tabla) => {
    try {
      const response = await fetch(
        `https://app-alumnado-latest.onrender.com/alumnado/api/v1/${tabla}`
      );
      if (response.ok) {
        const data = await response.json();
        const idsTabla = data.map((fila) => {
          const idKey = Object.keys(fila).find((key) => key.startsWith("id_"));
          return idKey ? fila[idKey] : null;
        });
        setArrayIDs(idsTabla.filter(Boolean));
      }
    } catch (err) {
      console.error("Error al actualizar IDs:", err);
    }
  };

  const agregarFila = async (tabla, nuevaFila) => {
    setLoadingAgregar(true);
    setErrorAgregar(null);
    try {
      const token = localStorage.getItem("jwtToken");
      const response = await fetch(
        `https://app-alumnado-latest.onrender.com/alumnado/api/v1/${tabla}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
          body: JSON.stringify(nuevaFila),
        }
      );

      if (!response.ok) {
        throw new Error("Error al agregar la fila. " + response.statusText);
      }

      const data = await response.json();
      console.log("Fila agregada exitosamente: ", data);
      actualizarArrayIds(tabla);
      return data;
    } catch (err) {
      setErrorAgregar(err.message);
      throw err;
    } finally {
      setLoadingAgregar(false);
    }
  };

  const modificarFila = async (tabla, id, filaModificada) => {
    setLoadingModificar(true);
    setErrorModificar(null);
    try {
      const token = localStorage.getItem("jwtToken"); // Obtener el token
      const response = await fetch(
        `https://app-alumnado-latest.onrender.com/alumnado/api/v1/${tabla}/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json", // Asegúrate de incluir este header
            Authorization: `Bearer ${token}`, // Incluir el token JWT
          },
          credentials: "include",
          body: JSON.stringify(filaModificada),
        }
      );

      if (!response.ok) {
        throw new Error("Error al modificar la fila. " + response.statusText);
      }

      const data = await response.json();
      console.log("Fila modificada exitosamente:", data);
      actualizarArrayIds(tabla);
      return data;
    } catch (err) {
      setErrorModificar(err.message);
      throw err;
    } finally {
      setLoadingModificar(false);
    }
  };

  const eliminarFila = async (tabla, id) => {
    setLoadingEliminar(true);
    setErrorEliminar(null);
    try {
      const token = localStorage.getItem("jwtToken");
      const response = await fetch(
        `https://app-alumnado-latest.onrender.com/alumnado/api/v1/${tabla}/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Error al eliminar la fila. " + response.statusText);
      }

      console.log(`Fila con ID ${id} eliminada exitosamente.`);
      actualizarArrayIds(tabla);
      return true;
    } catch (err) {
      setErrorEliminar(err.message);
      throw err;
    } finally {
      setLoadingEliminar(false);
    }
  };

  async function obtenerProfesor(id) {
    try {
      const response = await fetch(
        `https://app-alumnado-latest.onrender.com/alumnado/api/v1/profesores/${id}`
      );
      if (response.ok) {
        const profesor = await response.json();
        return profesor;
      }
    } catch (err) {
      console.error(
        "Error al intentar obtener un profesor con el ID especificado. ",
        err
      );
    }
  }

  return {
    agregarFila,
    modificarFila,
    eliminarFila,
    actualizarArrayIds,
    obtenerProfesor,
    loadingAgregar,
    loadingModificar,
    loadingEliminar,
    errorAgregar,
    errorModificar,
    errorEliminar,
    arrayIDs,
  };
};

export default useActions;
