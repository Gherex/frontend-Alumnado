import useFetch from "../../../hooks/useFetch";
import CirculoDeCarga from "../../CirculoDeCarga";
import "../../../css/tabla.css";

function TablaMaterias() {
  const { data, loading, error } = useFetch(
    "https://app-alumnado-latest.onrender.com/alumnado/api/v1/materias"
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
                data.map((materia) => (
                  <tr key={materia.id_materia}>
                    <td>{materia.id_materia}</td>
                    <td>{materia.nombre}</td>
                    <td>{materia.profesor.id_profesor}</td>
                    <td>{materia.profesor.persona.nombre}</td>
                    <td>{materia.profesor.persona.apellido}</td>
                    <td>{materia.profesor.persona.dni}</td>
                    <td>{materia.profesor.fecha_contratacion}</td>
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

export default TablaMaterias;
