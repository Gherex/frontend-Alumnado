import { useState } from "react";
import CirculoDeCarga from "../../../CirculoDeCarga";

function FormModificarMateria({ modificarFila, loading, error, arrayIDs }) {
  const [selectedId, setSelectedId] = useState("");
  const [profesor, setProfesor] = useState("");
  const [nombre, setNombre] = useState("");

  const fetchMateriaData = async (id) => {
    try {
      const response = await fetch(
        `https://app-alumnado-latest.onrender.com/alumnado/api/v1/materias/${id}`
      );
      if (response.ok) {
        const data = await response.json();

        setNombre(data.nombre);
        setProfesor(data.profesor);
      }
    } catch (err) {
      console.error("Error al obtener los datos del alumno:", err);
    }
  };

  const handleIdChange = async (e) => {
    const id = e.target.value;
    setSelectedId(id);

    // Si se selecciona un ID válido, obtener los datos de la materia
    if (id) {
      await fetchMateriaData(id);
    } else {
      setNombre("");
    }
  };

  //Nombre de materia
  const handleChange = (e) => {
    setNombre(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Evitar el comportamiento por defecto del formulario

    if (!selectedId) {
      alert("Selecciona un ID válido");
      return;
    }

    // Construir el objeto Materia
    const updatedMateria = {
      id_materia: selectedId,
      nombre: nombre,
      profesor: profesor,
    };

    try {
      await modificarFila("materias", selectedId, updatedMateria);
    } catch (err) {
      console.error("Error al agregar una nueva materia. ", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <select
        id="select-modificar-materia"
        value={selectedId}
        onChange={handleIdChange}
        required
        className="select-input"
      >
        <option value="">Selecciona un ID</option>
        {arrayIDs && arrayIDs.length > 0 ? (
          arrayIDs.map((id) => (
            <option key={id} value={id}>
              {id}
            </option>
          ))
        ) : (
          <option value="" disabled>
            Cargando IDs...
          </option>
        )}
      </select>
      <label htmlFor="nombre">
        Nombre de materia:
        <input
          id="nombre"
          type="text"
          name="nombre"
          value={nombre}
          onChange={handleChange}
          required
        />
      </label>
      <fieldset>
        <button type="submit" disabled={loading} className="action-button">
          {loading ? <CirculoDeCarga /> : "Modificar Materia"}
        </button>
      </fieldset>
      {error && <p style={{ textAlign: "center", color: "red" }}>{error}</p>}
    </form>
  );
}

export default FormModificarMateria;
