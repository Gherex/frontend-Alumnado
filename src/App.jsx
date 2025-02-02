import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import LoginPage from "./components/LoginPage";
import AlumnadoPage from "./components/alumnado/AlumnadoPage";
import TablaAlumnos from "./components/alumnado/tablas/TablaAlumnos";
import TablaProfesores from "./components/alumnado/tablas/TablaProfesores";
import TablaInscripciones from "./components/alumnado/tablas/TablaInscripciones";
import TablaMaterias from "./components/alumnado/tablas/TablaMaterias";
import { AuthProvider, useAuth } from "./context/AuthProvider";
import "./css/app.css";
import { useEffect } from "react";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Ruta pública para la página de login */}
          <Route path="/" element={<LoginPage />} />

          {/* Ruta protegida para la página de Alumnado */}
          <Route
            path="/alumnado/*"
            element={
              <ProtectedRoute>
                <AlumnadoPage />
              </ProtectedRoute>
            }
          >
            {/* Subrutas para diferentes tablas */}
            <Route path="alumnos" element={<TablaAlumnos />} />
            <Route path="profesores" element={<TablaProfesores />} />
            <Route path="inscripciones" element={<TablaInscripciones />} />
            <Route path="materias" element={<TablaMaterias />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

function ProtectedRoute({ children }) {
  const { role } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (!token && role !== "guest") {
      navigate("/");
    }
  }, [role, navigate]);

  return children;
}

export default App;
