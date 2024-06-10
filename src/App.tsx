import { BrowserRouter } from "react-router-dom";

import "./shared/forms/TraducoesYup";

import { AppRoutes } from "./routes";
import { MenuLateral } from "./shared/components";
import { AppThemeProvider, AppDrawerProvider } from "./shared/contexts";
import { Login } from "./pages";
import { AuthProvider } from "./shared/contexts/AuthContext";

export const App = () => {
  return (
    <AuthProvider>
      <AppThemeProvider>
        <Login>
          <AppDrawerProvider>
            <BrowserRouter>
              <MenuLateral>
                <AppRoutes />
              </MenuLateral>
            </BrowserRouter>
          </AppDrawerProvider>
        </Login>
      </AppThemeProvider>
    </AuthProvider>
  );
};
