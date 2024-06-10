// import { FerramentasDaListagem } from "../../shared/components";
import { FerramentasDeDetalhe } from "../../shared/components";
import { LayoutBaseDePagina } from "../../shared/layouts";

export const Dashboard = () => {
  return (
    <LayoutBaseDePagina
      barraDeFerramentas={<FerramentasDeDetalhe mostrarBotaoSalvarEVoltar/>}
    >
      Teste
    </LayoutBaseDePagina>
  );
};
