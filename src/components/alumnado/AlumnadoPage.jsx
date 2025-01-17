import ListadoTablas from "./ListadoTablas";
import useFetch from "../../hooks/useFetch";
import { useAuth } from "../../context/AuthProvider";
import { Outlet } from "react-router-dom";
import AuthenticatedActions from "./AuthenticatedActions";
import { useState } from "react";

function AlumnadoPage() {
  const { role } = useAuth();
  const baseUrl = "https://app-alumnado-latest.onrender.com/alumnado/api/v1";
  const [tabla, setTabla] = useState("alumnos");

  // Llamada a la API
  const { data, loading, error } = useFetch(`${baseUrl}/${tabla}`);

  return (
    <div className="alumnado-container">
      {loading && <p>Cargando...</p>}
      {error && <p>Error: {error}</p>}

      <h1>Alumnado Page</h1>
      {/* Componente para la lista de tablas */}
      <ListadoTablas setTabla={setTabla} />
      {/* Renderiza las subrutas */}
      <Outlet />
      {role === "admin" ? <AuthenticatedActions /> : ""}
    </div>
  );
}

export default AlumnadoPage;
