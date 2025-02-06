import { useState } from "react";
import CirculoDeCarga from "../../../CirculoDeCarga";

function FormAgregarMateria({
  agregarFila,
  loading,
  error,
  profesoresIds,
  getFila,
  actualizarMateriasIds,
}) {
  const [selectedId, setSelectedId] = useState("");
  const [nombre, setNombre] = useState("");

  const handleChange = (e) => {
    setNombre(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedId) {
      alert("Selecciona un ID válido");
      return;
    }

    const profesor = await getFila("profesores", selectedId);

    // Construir el objeto Materia
    const newMateria = {
      nombre: nombre,
      profesor: profesor,
    };

    try {
      await agregarFila("materias", newMateria);
      actualizarMateriasIds();
    } catch (err) {
      console.error("Error al agregar una nueva materia. ", err);
    }
  };

  const handleIdChange = async (e) => {
    setSelectedId(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
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
      <select
        id="select-agregar-materia"
        value={selectedId}
        onChange={handleIdChange}
        required
        className="select-input"
      >
        <option value="">Selecciona un ID de Profesor</option>
        {profesoresIds && profesoresIds.length > 0 ? (
          profesoresIds.map((id) => (
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
      <fieldset>
        <button type="submit" disabled={loading} className="action-button">
          {loading ? <CirculoDeCarga /> : "Agregar Materia"}
        </button>
      </fieldset>
      {error && <p style={{ textAlign: "center", color: "red" }}>{error}</p>}
    </form>
  );
}

export default FormAgregarMateria;
