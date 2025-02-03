function PersonaForm({ handleChange, formData }) {
  return (
    <>
      <h3>Información Personal</h3>
      <label htmlFor="nombre">
        Nombre:
        <input
          id="nombre"
          type="text"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          required
        />
      </label>
      <label htmlFor="apellido">
        Apellido:
        <input
          id="apellido"
          type="text"
          name="apellido"
          value={formData.apellido}
          onChange={handleChange}
          required
        />
      </label>
      <label htmlFor="dni">
        DNI:
        <input
          id="dni"
          type="number"
          name="dni"
          value={formData.dni}
          onChange={handleChange}
          required
        />
      </label>
      <label htmlFor="fecha_nacimiento">
        Fecha de nacimiento:
        <input
          type="date"
          id="fecha_nacimiento"
          name="fecha_nacimiento"
          value={formData.fecha_nacimiento}
          onChange={handleChange}
          required
        />
      </label>
      <label htmlFor="correo_electronico">
        Correo Electrónico:
        <input
          id="correo_electronico"
          type="email"
          name="correo_electronico"
          value={formData.correo_electronico}
          onChange={handleChange}
          required
        />
      </label>
      <label htmlFor="telefono">
        Teléfono:
        <input
          id="telefono"
          type="tel"
          name="telefono"
          value={formData.telefono}
          onChange={handleChange}
          required
        />
      </label>
    </>
  );
}
export default PersonaForm;
