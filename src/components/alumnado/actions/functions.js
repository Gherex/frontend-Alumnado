const agregarFila = async (tabla, nuevaFila) => {
  try {
    const token = sessionStorage.getItem("authToken");
    const response = await fetch(
      `https://app-alumnado-latest.onrender.com/alumnado/api/v1/${tabla}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(nuevaFila),
      }
    );

    if (!response.ok) {
      throw new Error("Error al agregar la fila: " + response.statusText);
    }

    const data = await response.json();
    console.log("Fila agregada exitosamente:", data);
    return data;
  } catch (error) {
    console.error("Error en la solicitud:", error.message);
    throw error;
  }
};

const modificarFila = async (tabla, id, filaModificada) => {
  try {
    const token = sessionStorage.getItem("authToken");
    const response = await fetch(
      `https://app-alumnado-latest.onrender.com/alumnado/api/v1/${tabla}/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(filaModificada),
      }
    );

    if (!response.ok) {
      throw new Error("Error al modificar la fila: " + response.statusText);
    }

    const data = await response.json();
    console.log("Fila modificada exitosamente:", data);
    return data;
  } catch (error) {
    console.error("Error en la solicitud:", error.message);
    throw error;
  }
};

const eliminarFila = async (tabla, id) => {
  try {
    const token = sessionStorage.getItem("authToken");
    const response = await fetch(
      `https://app-alumnado-latest.onrender.com/alumnado/api/v1/${tabla}/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`, // Incluir el token en el encabezado
        },
      }
    );

    if (!response.ok) {
      throw new Error("Error al eliminar la fila: " + response.statusText);
    }

    console.log(`Fila con ID ${id} eliminada exitosamente.`);
    return true; // Opcional: indica éxito
  } catch (error) {
    console.error("Error en la solicitud:", error.message);
    throw error;
  }
};

export { agregarFila, modificarFila, eliminarFila };
