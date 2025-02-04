import { useState } from "react";
import CirculoDeCarga from "../../../CirculoDeCarga";

function FormEliminarInscripcion({ eliminarFila, loading, error, arrayIDs }) {
  const [selectedId, setSelectedId] = useState("");

  const handleIdChange = async (e) => {
    setSelectedId(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedId) {
      alert("Selecciona un ID válido");
      return;
    }

    try {
      await eliminarFila("inscripciones", selectedId);
    } catch (err) {
      console.error("Error al intentar eliminar una inscripcion. ", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <select
        id="select-eliminar-inscripcion"
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
      <fieldset>
        <button type="submit" disabled={loading} className="action-button">
          {loading ? <CirculoDeCarga /> : "Eliminar Inscripción"}
        </button>
      </fieldset>
      {error && <p style={{ textAlign: "center", color: "red" }}>{error}</p>}
    </form>
  );
}

export default FormEliminarInscripcion;
