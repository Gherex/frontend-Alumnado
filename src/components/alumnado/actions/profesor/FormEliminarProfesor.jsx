import { useState } from "react";
import CirculoDeCarga from "../../../CirculoDeCarga";

function FormEliminarProfesor({
  eliminarFila,
  loading,
  error,
  profesoresIds,
  actualizarProfesoresIds,
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
      await eliminarFila("profesores", selectedId);
      setSelectedId(""); // Resetear selección
      actualizarProfesoresIds();
    } catch (err) {
      console.error("Error al intentar eliminar un profesor. ", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <select
        id="select-eliminar"
        value={selectedId}
        onChange={handleIdChange}
        required
        className="select-input"
      >
        <option value="">Selecciona un ID</option>
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
          {loading ? <CirculoDeCarga /> : "Eliminar Profesor"}
        </button>
      </fieldset>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
}

export default FormEliminarProfesor;
