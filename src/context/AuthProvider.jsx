import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [role, setRole] = useState(() => {
    return localStorage.getItem("userRole") || "guest";
  });

  // Verificar el token al montar el componente
  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      setRole("admin");
    } else {
      setRole("guest");
    }
  }, []);

  const login = (newRole) => {
    localStorage.setItem("userRole", newRole);
    setRole(newRole);
  };

  const logout = () => {
    localStorage.removeItem("userRole");
    localStorage.removeItem("jwtToken");
    setRole("guest");
  };

  return (
    <AuthContext.Provider value={{ role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
