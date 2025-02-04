import { useState } from "react";
import CirculoDeCarga from "../../../CirculoDeCarga";

function FormAgregarInscripcion({
  agregarFila,
  loading,
  error,
  obtenerFila,
  alumnosID,
  materiasID,
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

    const alumno = await obtenerFila("alumnos", selectedAlumnoId);
    const materia = await obtenerFila("materias", selectedMateriaId);

    // Construir el objeto Materia
    const newInscripcion = {
      fecha_inscripcion: fecha_inscripcion,
      alumno: alumno,
      materia: materia,
    };

    try {
      await agregarFila("inscripciones", newInscripcion);
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
        {alumnosID && alumnosID.length > 0 ? (
          alumnosID.map((id) => (
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
        {materiasID && materiasID.length > 0 ? (
          materiasID.map((id) => (
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
