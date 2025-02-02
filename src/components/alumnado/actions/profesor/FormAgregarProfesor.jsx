import { useState } from "react";
import PersonaForm from "../PersonaForm";
import CirculoDeCarga from "../../../CirculoDeCarga";

function FormAgregarProfesor({ agregarFila, loading, error }) {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    dni: "",
    fecha_nacimiento: "",
    correo_electronico: "",
    telefono: "",
    especialidad: "",
    fecha_contratacion: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value }); // Actualizar el estado dinámicamente
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newProfesor = {
      persona: {
        nombre: formData.nombre,
        apellido: formData.apellido,
        dni: formData.dni,
        fecha_nacimiento: formData.fecha_nacimiento,
        correo_electronico: formData.correo_electronico,
        telefono: formData.telefono,
      },
      especialidad: formData.especialidad,
      fecha_contratacion: formData.fecha_contratacion,
    };

    try {
      await agregarFila("profesores", newProfesor);
    } catch (err) {
      console.error("Error al agregar:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <PersonaForm handleChange={handleChange} formData={formData} />
      <h3>Información del Profesor</h3>
      <label htmlFor="especialidad">
        Especialidad:
        <input
          type="text"
          name="especialidad"
          value={formData.especialidad}
          onChange={handleChange}
          required
        />
      </label>
      <label htmlFor="fecha_contratacion">
        Fecha de contratación:
        <input
          type="date"
          id="fecha_contratacion"
          name="fecha_contratacion"
          value={formData.fecha_contratacion}
          onChange={handleChange}
          required
        />
      </label>
      <fieldset>
        <button type="submit" disabled={loading} className="action-button">
          {loading ? <CirculoDeCarga /> : "Agregar Profesor"}
        </button>
      </fieldset>
      {error && <p style={{ textAlign: "center", color: "red" }}>{error}</p>}
    </form>
  );
}

export default FormAgregarProfesor;
