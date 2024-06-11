import { BrowserRouter } from "react-router-dom";

import "./shared/forms/TraducoesYup";

import { PrivateRoutes, PublicRoutes } from "./routes";
import { MenuLateral } from "./shared/components";
import { AppThemeProvider, AppDrawerProvider } from "./shared/contexts";
import { AuthProvider, useAuthContext } from "./shared/contexts/AuthContext";

const Private = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuthContext();

  return isAuthenticated ? (
    <>{children}</>
  ) : (
    <AppThemeProvider>
      <PublicRoutes />
    </AppThemeProvider>
  );
};

export const App = () => {
  return (
    <AuthProvider>
      <AppThemeProvider>
        <AppDrawerProvider>
          <BrowserRouter>
            <Private>
              <MenuLateral>
                <PrivateRoutes />
              </MenuLateral>
            </Private>
          </BrowserRouter>
        </AppDrawerProvider>
      </AppThemeProvider>
    </AuthProvider>
  );
};
