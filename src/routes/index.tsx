import { Route, Routes } from "react-router-dom";
import { useAppDrawerContext } from "../shared/contexts";
import { useEffect } from "react";
import {
  Dashboard,
  DetalhesDeCidades,
  DetalhesDePessoas,
  ListagemDeCidade,
  ListagemDePessoa,
  SignIn,
  SignUp,
} from "../pages";

export const AppRoutes = () => {
  const { setDrawerOptions } = useAppDrawerContext();

  useEffect(() => {
    setDrawerOptions([
      { icon: "home", path: "/pagina-inicial", label: "Página Inicial" },
      { icon: "location_city", path: "/cidades", label: "Cidades" },
      { icon: "people", path: "/pessoas", label: "Pessoas" },
    ]);
  }, [setDrawerOptions]);

  return (
    <Routes>
      <Route path="/login" element={<SignIn />} />
      <Route path="/cadastro" element={<SignUp />} />
      <Route path="/pagina-inicial" element={<Dashboard />} />
      <Route path="/cidades" element={<ListagemDeCidade />} />
      <Route path="/cidades/detalhe/:id" element={<DetalhesDeCidades />} />
      <Route path="/pessoas" element={<ListagemDePessoa />} />
      <Route path="/pessoas/detalhe/:id" element={<DetalhesDePessoas />} />
      <Route path="*" element={<div>Error 404</div>} /> 
    </Routes>
  );
};
