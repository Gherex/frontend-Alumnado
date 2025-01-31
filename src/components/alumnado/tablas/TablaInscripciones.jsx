import useFetch from "../../../hooks/useFetch";
import CirculoDeCarga from "../../CirculoDeCarga";
import "../../../css/tabla.css";

function TablaInscripciones() {
  const { data, loading, error } = useFetch(
    "https://app-alumnado-latest.onrender.com/alumnado/api/v1/inscripciones"
  );

  return (
    <>
      {error && <p style={{ textAlign: "center", color: "red" }}>{error}</p>}
      {loading ? (
        <CirculoDeCarga />
      ) : (
        <div className="tabla">
          <table>
            <thead>
              <tr>
                <th>ID_Inscripción</th>
                <th>Fecha de Inscripción</th>
                <th>ID_Alumno</th>
                <th>Matricula</th>
                <th>Fecha de Ingreso</th>
                <th>ID_Materia</th>
                <th>Nombre Materia</th>
                <th>ID_Profesor</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>DNI</th>
                <th>Fecha de Contratación</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(data) &&
                data.map((inscripcion) => (
                  <tr key={inscripcion.id_inscripcion}>
                    <td>{inscripcion.id_inscripcion}</td>
                    <td>{inscripcion.fecha_inscripcion}</td>
                    <td>{inscripcion.alumno.id_alumno}</td>
                    <td>{inscripcion.alumno.matricula}</td>
                    <td>{inscripcion.alumno.fecha_ingreso}</td>
                    <td>{inscripcion.materia.id_materia}</td>
                    <td>{inscripcion.materia.nombre}</td>
                    <td>{inscripcion.materia.profesor.id_profesor}</td>
                    <td>{inscripcion.materia.profesor.persona.nombre}</td>
                    <td>{inscripcion.materia.profesor.persona.apellido}</td>
                    <td>{inscripcion.materia.profesor.persona.dni}</td>
                    <td>{inscripcion.materia.profesor.fecha_contratacion}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

export default TablaInscripciones;
