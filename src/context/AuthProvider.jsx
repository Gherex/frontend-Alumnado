import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [role, setRole] = useState(() => {
    return localStorage.getItem("jwtToken") ? "admin" : "guest"; // ← Deriva el rol del token
  });

  const login = (newRole) => {
    setRole(newRole);
  };

  const logout = () => {
    setRole("guest"); // ← No borra completamente, mantengo estado guest
    localStorage.removeItem("jwtToken");
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
