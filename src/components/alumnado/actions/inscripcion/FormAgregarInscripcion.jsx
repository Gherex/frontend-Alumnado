import { useState } from "react";
import CirculoDeCarga from "../../../CirculoDeCarga";

function FormAgregarInscripcion({
  agregarFila,
  loading,
  error,
  getFila,
  actualizarInscripcionesIds,
  alumnosIds,
  materiasIds,
}) {
  const [selectedAlumnoId, setSelectedAlumnoId] = useState("");
  const [selectedMateriaId, setSelectedMateriaId] = useState("");
  const [fecha_inscripcion, setFecha_inscripcion] = useState("");

  const handleChange = (e) => {
    setFecha_inscripcion(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedAlumnoId && !selectedMateriaId) {
      alert("Selecciona IDs válidos!");
      return;
    }

    const alumno = await getFila("alumnos", selectedAlumnoId);
    const materia = await getFila("materias", selectedMateriaId);

    // Construir el objeto Materia
    const newInscripcion = {
      fecha_inscripcion: fecha_inscripcion,
      alumno: alumno,
      materia: materia,
    };

    try {
      await agregarFila("inscripciones", newInscripcion);
      actualizarInscripcionesIds();
    } catch (err) {
      console.error("Error al intentar agregar una nueva inscripción. ", err);
    }
  };

  const handleAlumnoIdChange = async (e) => {
    setSelectedAlumnoId(e.target.value);
  };

  const handleMateriaIdChange = async (e) => {
    setSelectedMateriaId(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <label htmlFor="fecha_inscripcion">
        Fecha de inscripción:
        <input
          id="fecha_inscripcion"
          type="date"
          name="fecha_inscripcion"
          value={fecha_inscripcion}
          onChange={handleChange}
          required
        />
      </label>
      <select
        id="select-alumno-agregar-inscripcion"
        value={selectedAlumnoId}
        onChange={handleAlumnoIdChange}
        required
        className="select-input"
      >
        <option value="">Selecciona un ID de Alumno</option>
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
      <select
        id="select-materia-agregar-inscripcion"
        value={selectedMateriaId}
        onChange={handleMateriaIdChange}
        required
        className="select-input"
      >
        <option value="">Selecciona un ID de Materia</option>
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
          {loading ? <CirculoDeCarga /> : "Agregar Inscripción"}
        </button>
      </fieldset>
      {error && <p style={{ textAlign: "center", color: "red" }}>{error}</p>}
    </form>
  );
}

export default FormAgregarInscripcion;
