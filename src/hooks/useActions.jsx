import { useState } from "react";

const useActions = () => {
  // Estados separados para cada acción
  const [loadingAgregar, setLoadingAgregar] = useState(false);
  const [loadingModificar, setLoadingModificar] = useState(false);
  const [loadingEliminar, setLoadingEliminar] = useState(false);

  const [errorAgregar, setErrorAgregar] = useState(null);
  const [errorModificar, setErrorModificar] = useState(null);
  const [errorEliminar, setErrorEliminar] = useState(null);

  const getIdsTabla = async (tabla) => {
    try {
      const response = await fetch(
        `https://app-alumnado-latest.onrender.com/alumnado/api/v1/${tabla}`
      );
      if (response.ok) {
        const data = await response.json();
        // Crear el prefijo a partir de los primeros 3 caracteres del nombre de la tabla
        const prefix = `id_${tabla.slice(0, 3)}`.toLowerCase(); // Ej: "alumnos" -> "id_alu"
        const idsTabla = data.map((fila) => {
          // Busca la clave que comience con ese prefijo
          const idKey = Object.keys(fila).find((key) => key.startsWith(prefix));
          return idKey ? fila[idKey] : null;
        });
        return idsTabla.filter(Boolean);
      }
    } catch (err) {
      console.error(
        `Error al intentar obtener los IDs de tabla ${tabla}.`,
        err
      );
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
        throw new Error(
          `Error al intentar agregar la fila en tabla ${tabla}. ` +
            response.statusText
        );
      }
      const data = await response.json();
      console.log(`Fila agregada exitosamente en tabla ${tabla}.`, data);
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
        throw new Error(
          `Error al intentar modificar la fila ${id} de la tabla ${tabla}. ` +
            response.statusText
        );
      }

      const data = await response.json();
      console.log(
        `Fila ${id} de la tabla ${tabla} modificada exitosamente. `,
        data
      );
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
        throw new Error(
          `Error al intentar eliminar la fila ${id} de la tabla ${tabla}. ` +
            response.statusText
        );
      }

      console.log(
        `Fila con ID ${id} de la tabla ${tabla} eliminada exitosamente. `
      );
      return true;
    } catch (err) {
      setErrorEliminar(err.message);
      throw err;
    } finally {
      setLoadingEliminar(false);
    }
  };

  async function getFila(tabla, id) {
    try {
      const response = await fetch(
        `https://app-alumnado-latest.onrender.com/alumnado/api/v1/${tabla}/${id}`
      );
      if (response.ok) {
        const fila = await response.json();
        return fila;
      }
    } catch (err) {
      console.error(
        `Error al intentar obtener la fila ${id} de la tabla ${tabla}. `,
        err
      );
    }
  }

  return {
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
  };
};

export default useActions;
