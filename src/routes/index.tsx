import { Button } from "@mui/material";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAppDrawerContext } from "../shared/contexts";

export const AppRoutes = () => {
  const { toggleDrawerOpen } = useAppDrawerContext();
  return (
    <Routes>
      <Route path="/pagina-inicial" element={
        <Button variant="contained" color="primary" onClick={toggleDrawerOpen}>Teste</Button>
      } />
      <Route path="*" element={<Navigate to="/pagina-inicial" />} />
    </Routes>
  );
};
