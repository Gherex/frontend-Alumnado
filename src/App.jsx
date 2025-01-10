import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./components/LoginPage";
import AlumnadoPage from "./components/alumnado/AlumnadoPage";
import { AuthProvider } from "./context/AuthProvider";
import "./css/App.css";

function App() {
  const [role, setRole] = useState(null); // null, 'guest', 'admin'

  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Ruta inicial: Login */}
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
          {/* Ruta protegida: Alumnado */}
          <Route
            path="/alumnado"
            element={role ? <AlumnadoPage role={role} /> : <Navigate to="/" />}
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
