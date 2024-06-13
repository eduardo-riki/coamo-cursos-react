import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { AuthService } from "../services/api/auth/AuthService";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

interface IAuthContextData {
  isAuthenticated: boolean;
  login: (email: string, senha: string) => Promise<string | void>;
  logout: () => void;
}

const AuthContext = createContext({} as IAuthContextData);

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const navigate = useNavigate();
  const [accessToken, setAccessToken] = useState<string>();

  const handleLogin = useCallback(async (email: string, senha: string) => {
    const result = await AuthService.auth(email, senha);
    if (result instanceof Error) {
      throw result.message;
    } else {
      localStorage.setItem("APP_ACCESS_TOKEN", result.accessToken);
      setAccessToken(result.accessToken);
      navigate("/pagina-inicial");
    }
  }, []);

  const handleLogOut = useCallback(() => {
    localStorage.removeItem("APP_ACCESS_TOKEN");
    setAccessToken(undefined);
    navigate("/login");
  }, []);

  const isAuthenticated = useMemo(() => !!accessToken, [accessToken]);

  useEffect(() => {
    const accessToken = localStorage.getItem("APP_ACCESS_TOKEN") || undefined;

    if (accessToken) {
      const decoded = jwtDecode(accessToken);

      if (!!decoded.exp) {
        const currentTime = Date.now();
        const expTime = decoded.exp * 1000;

        if (expTime < currentTime) {
          handleLogOut();
          return;
        }
        setAccessToken(accessToken);
      }
    } else {
      handleLogOut();
    }
  }, [handleLogOut, setAccessToken]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login: handleLogin,
        logout: handleLogOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
