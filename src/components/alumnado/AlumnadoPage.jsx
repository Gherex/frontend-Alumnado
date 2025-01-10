import { useState } from "react";
import AuthenticatedPage from "./AuthenticatedPage";
import ListadoTablas from "./ListadoTablas";
import NoAuthenticatedPage from "./NoAuthenticatedPage";
import useFetch from "../../hooks/useFetch";

function AlumnadoPage({ role }) {
  const [tabla, setTabla] = useState(null);
  const baseUrl = "https://app-alumnado-latest.onrender.com/alumnado/api/v1";

  const { data, loading, error } = useFetch(
    tabla ? `${baseUrl}/${tabla}` : null
  );

  return (
    <div className="alumnado-container">
      <ListadoTablas setTabla={setTabla} />
      {console.log(data)}
      <div className="tablas-container">
        {role === "admin" ? (
          <AuthenticatedPage data={data} loading={loading} error={error} />
        ) : (
          <NoAuthenticatedPage data={data} loading={loading} error={error} />
        )}
      </div>
    </div>
  );
}

export default AlumnadoPage;
