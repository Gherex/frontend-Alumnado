import { useState } from "react";
import CirculoDeCarga from "../../../CirculoDeCarga";

function FormModificarInscripcion({
  modificarFila,
  loading,
  error,
  getFila,
  alumnosIds,
  materiasIds,
  inscripcionesIds,
}) {
  const [selectedInscripcionId, setSelectedInscripcionId] = useState("");
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
    const updatedInscripcion = {
      id_inscripcion: selectedInscripcionId,
      fecha_inscripcion: fecha_inscripcion,
      alumno: alumno,
      materia: materia,
    };

    try {
      await modificarFila(
        "inscripciones",
        selectedInscripcionId,
        updatedInscripcion
      );
    } catch (err) {
      console.error("Error al intentar modificar una inscripción. ", err);
    }
  };

  const handleInscripcionIdChange = async (e) => {
    setSelectedInscripcionId(e.target.value);
    const fila = await getFila("inscripciones", e.target.value);
    if (fila) {
      setSelectedAlumnoId(fila.alumno.id_alumno);
      setSelectedMateriaId(fila.materia.id_materia);
      setFecha_inscripcion(fila.fecha_inscripcion);
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
      <select
        id="select-modificar-inscripcion"
        value={selectedInscripcionId}
        onChange={handleInscripcionIdChange}
        required
        className="select-input"
      >
        <option value="">Selecciona un ID de Inscripción</option>
        {inscripcionesIds && inscripcionesIds.length > 0 ? (
          inscripcionesIds.map((id) => (
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
        id="select-alumno-modificar-inscripcion"
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
          <option value={selectedAlumnoId} disabled>
            Cargando IDs...
          </option>
        )}
      </select>
      <select
        id="select-materia-modificar-inscripcion"
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
          <option value={selectedMateriaId} disabled>
            Cargando IDs...
          </option>
        )}
      </select>
      <fieldset>
        <button type="submit" disabled={loading} className="action-button">
          {loading ? <CirculoDeCarga /> : "Modificar Inscripción"}
        </button>
      </fieldset>
      {error && <p style={{ textAlign: "center", color: "red" }}>{error}</p>}
    </form>
  );
}

export default FormModificarInscripcion;
