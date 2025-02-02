import useFetch from "../../../hooks/useFetch";
import CirculoDeCarga from "../../CirculoDeCarga";
import "../../../css/tabla.css";

function TablaProfesores() {
  const { data, loading, error } = useFetch(
    "https://app-alumnado-latest.onrender.com/alumnado/api/v1/profesores"
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
                <th>ID_Profesor</th>
                <th>Especialidad</th>
                <th>Fecha de Contratación</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>DNI</th>
                <th>Fecha de nacimiento</th>
                <th>Teléfono</th>
                <th>Correo electrónico</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(data) &&
                data.map((profesor) => (
                  <tr key={profesor.id_profesor}>
                    <td>{profesor.id_profesor}</td>
                    <td>{profesor.especialidad}</td>
                    <td>{profesor.fecha_contratacion}</td>
                    <td>{profesor.persona.nombre}</td>
                    <td>{profesor.persona.apellido}</td>
                    <td>{profesor.persona.dni}</td>
                    <td>{profesor.persona.fecha_nacimiento}</td>
                    <td>{profesor.persona.telefono}</td>
                    <td>{profesor.persona.correo_electronico}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
      {error && <p style={{ textAlign: "center", color: "red" }}>{error}</p>}
    </>
  );
}

export default TablaProfesores;
