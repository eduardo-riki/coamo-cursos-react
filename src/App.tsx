import { BrowserRouter } from "react-router-dom";

import "./shared/forms/TraducoesYup";

import { MenuLateral } from "./shared/components";
import { AppThemeProvider, AppDrawerProvider } from "./shared/contexts";
import { AuthProvider, useAuthContext } from "./shared/contexts/AuthContext";
import { SnackbarProvider } from "notistack";
import { AppRoutes } from "./routes";

const Authentication = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuthContext();
  
  if (isAuthenticated) return children;
  return <AppRoutes />;
};

export const App = () => {
  return (
    <AppThemeProvider>
      <AppDrawerProvider>
        <BrowserRouter>
          <SnackbarProvider maxSnack={3} autoHideDuration={3000}>
            <AuthProvider>
              <Authentication>
                <MenuLateral>
                  <AppRoutes />
                </MenuLateral>
              </Authentication>
            </AuthProvider>
          </SnackbarProvider>
        </BrowserRouter>
      </AppDrawerProvider>
    </AppThemeProvider>
  );
};
