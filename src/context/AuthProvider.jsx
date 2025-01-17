import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [role, setRole] = useState(sessionStorage.getItem("role"));
  const [token, setToken] = useState(sessionStorage.getItem("authToken"));

  const login = (newRole, newToken = null) => {
    setRole(newRole);
    setToken(newToken);
    sessionStorage.setItem("role", newRole);
    if (newToken) sessionStorage.setItem("authToken", newToken);
  };

  const logout = () => {
    setRole(null);
    setToken(null);
    sessionStorage.clear();
  };

  return (
    <AuthContext.Provider value={{ role, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook para consumir el contexto
export function useAuth() {
  return useContext(AuthContext);
}
