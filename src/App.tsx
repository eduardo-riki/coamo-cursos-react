import { BrowserRouter } from "react-router-dom";

import "./shared/forms/TraducoesYup";

import { PrivateRoutes, PublicRoutes } from "./routes";
import { MenuLateral } from "./shared/components";
import { AppThemeProvider, AppDrawerProvider } from "./shared/contexts";
import { AuthProvider, useAuthContext } from "./shared/contexts/AuthContext";
import { SnackbarProvider } from "notistack";

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
    <AppThemeProvider>
      <AppDrawerProvider>
        <BrowserRouter>
          <SnackbarProvider maxSnack={3} autoHideDuration={3000}>
            <AuthProvider>
              <Private>
                <MenuLateral>
                  <PrivateRoutes />
                </MenuLateral>
              </Private>
            </AuthProvider>
          </SnackbarProvider>
        </BrowserRouter>
      </AppDrawerProvider>
    </AppThemeProvider>
  );
};
