import { useState } from "react";

const useActions = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [arrayIDs, setArrayIDs] = useState([]);

  const actualizarArrayIds = async (tabla) => {
    try {
      const response = await fetch(
        `https://app-alumnado-latest.onrender.com/alumnado/api/v1/${tabla}`
      );
      if (response.ok) {
        const data = await response.json();
        // Crear nuevo array solo con los ID que comienzan con "id_"
        const idsTabla = data.map((fila) => {
          const idKey = Object.keys(fila).find((key) => key.startsWith("id_"));
          return idKey ? fila[idKey] : null; // Retorna el valor del ID si existe
        });
        setArrayIDs(idsTabla.filter(Boolean)); // Filtra valores nulos
        console.log("Entro aqui");
        console.log(arrayIDs);
      }
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const agregarFila = async (tabla, nuevaFila) => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("jwtToken"); // Recupera el token
      const response = await fetch(
        `https://app-alumnado-latest.onrender.com/alumnado/api/v1/${tabla}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          credentials: "include", // Esto pertenece a la configuración general de la solicitud, no a los headers
          body: JSON.stringify(nuevaFila),
        }
      );

      if (!response.ok) {
        throw new Error("Error al agregar la fila: " + response.statusText);
      }

      const data = await response.json();
      console.log("Fila agregada exitosamente: ", data);
      actualizarArrayIds(tabla);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const modificarFila = async (tabla, id, filaModificada) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://app-alumnado-latest.onrender.com/alumnado/api/v1/${tabla}/${id}`,
        {
          method: "PUT",
          credentials: "include",
          body: JSON.stringify(filaModificada),
        }
      );

      if (!response.ok) {
        throw new Error("Error al modificar la fila: " + response.statusText);
      }

      const data = await response.json();
      console.log("Fila modificada exitosamente:", data);
      actualizarArrayIds(tabla); // Actualiza los IDs
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const eliminarFila = async (tabla, id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://app-alumnado-latest.onrender.com/alumnado/api/v1/${tabla}/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Error al eliminar la fila: " + response.statusText);
      }

      console.log(`Fila con ID ${id} eliminada exitosamente.`);
      actualizarArrayIds(tabla); // Actualiza los IDs
      return true; // Indica éxito
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    agregarFila,
    modificarFila,
    eliminarFila,
    actualizarArrayIds,
    loading,
    error,
    arrayIDs,
  };
};

export default useActions;
