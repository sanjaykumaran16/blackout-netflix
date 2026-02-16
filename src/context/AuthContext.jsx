import { createContext, useContext, useState, useEffect } from "react";
import * as auth from "../utils/auth";

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() =>
    auth.isAuthenticated()
  );

  useEffect(() => {
    const sync = () => setIsAuthenticated(auth.isAuthenticated());
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);

  const login = (email, password) => {
    const result = auth.login(email, password);
    if (result.success) setIsAuthenticated(true);
    return result;
  };

  const logout = () => {
    auth.logout();
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
