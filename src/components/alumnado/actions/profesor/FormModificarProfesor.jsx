import { useState } from "react";
import CirculoDeCarga from "../../../CirculoDeCarga";
import PersonaForm from "../PersonaForm";

function FormModificarProfesor({ modificarFila, loading, error, arrayIDs }) {
  const [selectedId, setSelectedId] = useState("");
  const [formData, setFormData] = useState({
    id_profesor: "",
    nombre: "",
    apellido: "",
    dni: "",
    fecha_nacimiento: "",
    correo_electronico: "",
    telefono: "",
    especialidad: "",
    fecha_contratacion: "",
  });

  const fetchProfesorData = async (id) => {
    try {
      const response = await fetch(
        `https://app-alumnado-latest.onrender.com/alumnado/api/v1/profesores/${id}`
      );
      if (response.ok) {
        const data = await response.json();

        // Transformar los datos de la API para que coincidan con formData
        const transformedData = {
          id_profesor: data.id_profesor,
          nombre: data.persona.nombre,
          apellido: data.persona.apellido,
          dni: data.persona.dni,
          fecha_nacimiento: data.persona.fecha_nacimiento,
          correo_electronico: data.persona.correo_electronico,
          telefono: data.persona.telefono,
          especialidad: data.especialidad,
          fecha_contratacion: data.fecha_contratacion,
        };

        setFormData(transformedData);
      }
    } catch (err) {
      console.error("Error al obtener los datos del profesor:", err);
    }
  };

  const handleIdChange = async (e) => {
    const id = e.target.value;
    setSelectedId(id);

    // Si se selecciona un ID válido, obtener los datos del alumno
    if (id) {
      await fetchProfesorData(id);
    } else {
      // Si no hay ID seleccionado, resetear el formData
      setFormData({
        id_profesor: "",
        nombre: "",
        apellido: "",
        dni: "",
        fecha_nacimiento: "",
        correo_electronico: "",
        telefono: "",
        especialidad: "",
        fecha_contratacion: "",
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newProfesor = {
      id_profesor: formData.id_profesor,
      persona: {
        id_persona: formData.id_persona,
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

    if (!selectedId) {
      alert("Selecciona un ID válido");
      return;
    }

    try {
      await modificarFila("profesores", selectedId, newProfesor);
    } catch (err) {
      console.error("Error al modificar: ", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <select
        id="select-modificar"
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
          {loading ? <CirculoDeCarga /> : "Modificar Profesor"}
        </button>
      </fieldset>
      {error && <p style={{ textAlign: "center", color: "red" }}>{error}</p>}
    </form>
  );
}

export default FormModificarProfesor;
