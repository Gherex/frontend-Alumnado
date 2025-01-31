import { useState } from "react";
import PersonaForm from "../PersonaForm";
import CirculoDeCarga from "../../../CirculoDeCarga";

function FormModificarAlumno({ modificarFila, loading, error }) {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    dni: "",
    fecha_nacimiento: "",
    correo_electronico: "",
    telefono: "",
    matricula: "",
    fecha_ingreso: "",
  });

  // Manejar cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value }); // Actualizar el estado dinámicamente
  };

  // Enviar datos al backend
  const handleSubmit = async (e) => {
    e.preventDefault(); // Evitar el comportamiento por defecto del formulario

    // Construir el objeto Alumno
    const newAlumno = {
      persona: {
        nombre: formData.nombre,
        apellido: formData.apellido,
        dni: formData.dni,
        fecha_nacimiento: formData.fecha_nacimiento,
        correo_electronico: formData.correo_electronico,
        telefono: formData.telefono,
      },
      matricula: formData.matricula,
      fecha_ingreso: formData.fecha_ingreso,
    };

    try {
      await modificarFila("alumnos", newAlumno);
    } catch (err) {
      console.error("Error al agregar:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <PersonaForm handleChange={handleChange} formData={formData} />
      <h3>Información del Alumno</h3>
      <label htmlFor="matricula">
        Matrícula:
        <input
          type="text"
          name="matricula"
          value={formData.matricula}
          onChange={handleChange}
          required
        />
      </label>
      <label htmlFor="fecha_ingreso">
        Fecha de ingreso:
        <input
          type="date"
          id="fecha_ingreso"
          name="fecha_ingreso"
          value={formData.fecha_ingreso}
          onChange={handleChange}
          required
        />
      </label>
      <fieldset>
        <button type="submit" disabled={loading} className="action-button">
          {loading ? <CirculoDeCarga /> : "Modificar Alumno"}
        </button>
      </fieldset>
      {error && <p style={{ textAlign: "center", color: "red" }}>{error}</p>}
    </form>
  );
}

export default FormModificarAlumno;

// Para modificar
// await modificarFila("alumnos", 1, { nombre: "Juan", apellido: "Gómez" });
