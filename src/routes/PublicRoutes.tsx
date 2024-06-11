import { Navigate, Route, Routes } from "react-router-dom";

import { SignIn, SignUp } from "../pages";

export const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<SignIn />} />
      <Route path="/cadastro" element={<SignUp />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};
