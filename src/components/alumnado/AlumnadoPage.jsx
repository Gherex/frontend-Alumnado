import ListadoBotonesTablas from "./ListadoBotonesTablas";
import { useAuth } from "../../context/AuthProvider";
import { Outlet } from "react-router-dom";
import AuthenticatedActions from "./AuthenticatedActions";
import { useState } from "react";
import "../../css/alumnado.css";

function AlumnadoPage() {
  const { role } = useAuth();
  const [tabla, setTabla] = useState("alumnos");

  return (
    <div className="alumnado-container">
      {/* Componente para la lista de tablas */}
      <ListadoBotonesTablas setTabla={setTabla} />
      <h1>Alumnado App</h1>
      {/* Renderiza las subrutas */}
      <Outlet />
      {role === "admin" ? <AuthenticatedActions tabla={tabla} /> : null}
    </div>
  );
}

export default AlumnadoPage;
