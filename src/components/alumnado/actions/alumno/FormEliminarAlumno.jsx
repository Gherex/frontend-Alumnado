import { useState } from "react";
import CirculoDeCarga from "../../../CirculoDeCarga";

function FormEliminarAlumno({ eliminarFila, loading, error, arrayIDs }) {
  const [selectedId, setSelectedId] = useState("");

  const handleIdChange = (e) => {
    setSelectedId(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedId) {
      alert("Selecciona un ID válido");
      return;
    }
    try {
      await eliminarFila("alumnos", selectedId);
      setSelectedId(""); // Resetear selección
    } catch (err) {
      console.error("Error al eliminar:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <select
        value={selectedId}
        onChange={handleIdChange}
        required
        className="select-input"
      >
        <option value="">Selecciona un ID</option>
        {arrayIDs.map((id) => (
          <option key={id} value={id}>
            {id}
          </option>
        ))}
      </select>
      <fieldset>
        <button type="submit" disabled={loading} className="action-button">
          {loading ? <CirculoDeCarga /> : "Eliminar Alumno"}
        </button>
      </fieldset>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
}

export default FormEliminarAlumno;

// Para eliminar
// await eliminarFila("alumnos", 1); // Elimina la fila con ID 1
