import AlumnosActions from "./AlumnosActions";
import ProfesoresActions from "./ProfesoresActions";
import MateriasActions from "./MateriasActions";
import InscripcionesActions from "./InscripcionesActions";
import "../../../css/alumnado.css";

function AuthenticatedActions({ tabla }) {
  return (
    <div className="administrador-container">
      <h2 className="titulo-administrador">Panel de Administrador</h2>
      {tabla === "alumnos" ? (
        <AlumnosActions />
      ) : tabla === "profesores" ? (
        <ProfesoresActions />
      ) : tabla === "materias" ? (
        <MateriasActions />
      ) : tabla === "inscripciones" ? (
        <InscripcionesActions />
      ) : null}
    </div>
  );
}

export default AuthenticatedActions;
