import { useState } from "react";
import CirculoDeCarga from "../../../CirculoDeCarga";

function FormEliminarAlumno({
  eliminarFila,
  loading,
  error,
  alumnosIds,
  actualizarAlumnosIds,
}) {
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
      actualizarAlumnosIds();
    } catch (err) {
      console.error(
        "Error en el submit de Eliminar Authenticated Action Alumno",
        err
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <select
        id="select-eliminar-alumno"
        value={selectedId}
        onChange={handleIdChange}
        required
        className="select-input"
      >
        <option value="">Selecciona un ID</option>
        {alumnosIds && alumnosIds.length > 0 ? (
          alumnosIds.map((id) => (
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
          {loading ? <CirculoDeCarga /> : "Eliminar Alumno"}
        </button>
      </fieldset>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
}

export default FormEliminarAlumno;
