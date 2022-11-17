import { createContext, useEffect, useState } from "react";
import { AuthContextType } from "../../shared/types/service/ContextType";
import { getLocalStorage, removeLocalStorage } from "../auth/auth";

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuth, setIsAuth] = useState<boolean>(false);

  useEffect(() => {
    const token = getLocalStorage("token");
    if (token) setIsAuth(true);
  }, []);

  const login = () => {
    setIsAuth(true);
  };

  const logout = () => {
    setIsAuth(false);
    removeLocalStorage("token");
    removeLocalStorage("googleCalendar");
  };
  return (
    <AuthContext.Provider value={{ isAuth, setIsAuth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
