import { FerramentasDaListagem } from "../../shared/components";
import { LayoutBaseDePagina } from "../../shared/layouts";

export const ListagemDeCidade: React.FC = () => {
  return (
    <LayoutBaseDePagina
      titulo="Lista de Cidades"
      barraDeFerramentas={<FerramentasDaListagem mostrarCampoDeBusca/>}
    >
      Teste
    </LayoutBaseDePagina>
  );
};
