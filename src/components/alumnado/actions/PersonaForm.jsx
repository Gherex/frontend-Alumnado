function PersonaForm({ handleChange, formData }) {
  return (
    <>
      <h3>Información Personal</h3>
      <label htmlFor="nombre">
        Nombre:
        <input
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
