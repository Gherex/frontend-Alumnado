import { useState } from "react";
import CirculoDeCarga from "../../../CirculoDeCarga";
import PersonaForm from "../PersonaForm";

function FormModificarAlumno({ modificarFila, loading, error, arrayIDs }) {
  const [selectedId, setSelectedId] = useState("");
  const [formData, setFormData] = useState({
    id_alumno: "",
    nombre: "",
    apellido: "",
    dni: "",
    fecha_nacimiento: "",
    correo_electronico: "",
    telefono: "",
    matricula: "",
    fecha_ingreso: "",
  });

  // Función para obtener los datos del alumno basado en el ID seleccionado
  const fetchAlumnoData = async (id) => {
    try {
      const response = await fetch(
        `https://app-alumnado-latest.onrender.com/alumnado/api/v1/alumnos/${id}`
      );
      if (response.ok) {
        const data = await response.json();

        // Transformar los datos de la API para que coincidan con formData
        const transformedData = {
          id_alumno: data.id_alumno,
          nombre: data.persona.nombre,
          apellido: data.persona.apellido,
          dni: data.persona.dni,
          fecha_nacimiento: data.persona.fecha_nacimiento,
          correo_electronico: data.persona.correo_electronico,
          telefono: data.persona.telefono,
          matricula: data.matricula,
          fecha_ingreso: data.fecha_ingreso,
        };

        // Actualizar el estado formData con los datos transformados
        setFormData(transformedData);
      }
    } catch (err) {
      console.error("Error al obtener los datos del alumno:", err);
    }
  };

  // Manejar cambio de ID seleccionado
  const handleIdChange = async (e) => {
    const id = e.target.value;
    setSelectedId(id);

    // Si se selecciona un ID válido, obtener los datos del alumno
    if (id) {
      await fetchAlumnoData(id);
    } else {
      // Si no hay ID seleccionado, resetear el formData
      setFormData({
        id_alumno: "",
        nombre: "",
        apellido: "",
        dni: "",
        fecha_nacimiento: "",
        correo_electronico: "",
        telefono: "",
        matricula: "",
        fecha_ingreso: "",
      });
    }
  };

  // Manejar cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Enviar datos al backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newAlumno = {
      id_alumno: formData.id_alumno,
      persona: {
        id_persona: formData.id_persona,
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

    if (!selectedId) {
      alert("Selecciona un ID válido");
      return;
    }

    try {
      console.log("newAlumno: ", newAlumno);
      await modificarFila("alumnos", selectedId, newAlumno);
    } catch (err) {
      console.error("Error al modificar: ", err);
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
