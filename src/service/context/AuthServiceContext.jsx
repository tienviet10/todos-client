import React, { createContext, useEffect, useState } from "react";
import { getLocalStorage, removeLocalStorage } from "../auth/auth";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const token = getLocalStorage();
    if (token) setIsAuth(true);
  }, []);

  const login = () => {
    setIsAuth(true);
  };

  const logout = () => {
    setIsAuth(false);
    removeLocalStorage("token");
  };
  return (
    <AuthContext.Provider value={{ isAuth, setIsAuth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
