import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const email = JSON.parse(atob(token.split('.')[1])).email;
      setUser({ email });
    }
  }, []);

  const login = (token) => {
    localStorage.setItem("token", token);
    const email = JSON.parse(atob(token.split('.')[1])).email;
    setUser({ email });
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}