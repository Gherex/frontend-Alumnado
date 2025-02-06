import useFetch from "../../../hooks/useFetch";
import CirculoDeCarga from "../../CirculoDeCarga";
import "../../../css/tabla.css";

function TablaAlumnos() {
  const { data, loading, error } = useFetch(
    "https://app-alumnado-latest.onrender.com/alumnado/api/v1/alumnos"
  );

  return (
    <>
      {loading ? (
        <CirculoDeCarga />
      ) : (
        <div className="tabla">
          <table>
            <thead>
              <tr>
                <th>ID Alumno</th>
                <th>Matrícula</th>
                <th>Fecha de Ingreso</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>DNI</th>
                <th>Fecha de Nacimiento</th>
                <th>Teléfono</th>
                <th>Correo Electrónico</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(data) &&
                data.map((alumno) => (
                  <tr key={alumno.id_alumno}>
                    <td>{alumno.id_alumno}</td>
                    <td>{alumno.matricula}</td>
                    <td>{alumno.fecha_ingreso}</td>
                    <td>{alumno.persona.nombre}</td>
                    <td>{alumno.persona.apellido}</td>
                    <td>{alumno.persona.dni}</td>
                    <td>{alumno.persona.fecha_nacimiento}</td>
                    <td>{alumno.persona.telefono}</td>
                    <td>{alumno.persona.correo_electronico}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
      {error && (
        <p
          style={{
            textAlign: "center",
            color: "red",
            margin: "1rem",
            padding: "2rem 0",
          }}
        >
          {error}
        </p>
      )}
    </>
  );
}

export default TablaAlumnos;
