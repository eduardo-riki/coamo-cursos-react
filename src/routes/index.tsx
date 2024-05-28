import { Button } from "@mui/material";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAppDrawerContext } from "../shared/contexts";
import { useEffect } from "react";

export const AppRoutes = () => {
  const { toggleDrawerOpen, setDrawerOptions } = useAppDrawerContext();

  useEffect(() => {
    setDrawerOptions([
      { icon: "home", path: "/pagina-inicial", label: "Página Inicial" },
    ]);
  });

  return (
    <Routes>
      <Route
        path="/pagina-inicial"
        element={
          <Button
            variant="contained"
            color="primary"
            onClick={toggleDrawerOpen}
          >
            Teste
          </Button>
        }
      />
      <Route path="*" element={<Navigate to="/pagina-inicial" />} />
    </Routes>
  );
};
