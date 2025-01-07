import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./components/Login";
import Alumnado from "./components/Alumnado";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthProvider";
import "./css/App.css";

function App() {
  const [role, setRole] = useState(null); // null, 'guest', 'admin'

  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Ruta inicial: redirige a Login si no hay rol */}
          <Route
            path="/"
            element={
              role ? (
                <Navigate to="/alumnado" replace />
              ) : (
                <Login setRole={setRole} />
              )
            }
          />

          {/* Ruta protegida para Alumnado */}
          <Route
            path="/alumnado"
            element={
              role ? (
                <ProtectedRoute role={role}>
                  <Alumnado />
                </ProtectedRoute>
              ) : (
                <Navigate to="/" replace />
              )
            }
          />

          {/* Redirigir cualquier ruta desconocida al login */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
