import { useState } from "react";
import CirculoDeCarga from "../../../CirculoDeCarga";

function FormEliminarMateria({
  eliminarFila,
  loading,
  error,
  materiasIds,
  actualizarMateriasIds,
}) {
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
      await eliminarFila("materias", selectedId);
      actualizarMateriasIds();
    } catch (err) {
      console.error("Error al intentar eliminar una materia. ", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <select
        id="select-eliminar-materia"
        value={selectedId}
        onChange={handleIdChange}
        required
        className="select-input"
      >
        <option value="">Selecciona un ID</option>
        {materiasIds && materiasIds.length > 0 ? (
          materiasIds.map((id) => (
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
          {loading ? <CirculoDeCarga /> : "Eliminar Materia"}
        </button>
      </fieldset>
      {error && <p style={{ textAlign: "center", color: "red" }}>{error}</p>}
    </form>
  );
}

export default FormEliminarMateria;
