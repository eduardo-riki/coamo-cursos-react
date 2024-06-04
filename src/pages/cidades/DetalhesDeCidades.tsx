import { useParams } from "react-router-dom";
import { LayoutBaseDePagina } from "../../shared/layouts";
import { FerramentasDeDetalhe } from "../../shared/components";

export const DetalhesDeCidades = () => {
  const { id = "nova" } = useParams<"id">();

  return (
    <div>
      <LayoutBaseDePagina
        titulo="Detalhe de Pessoa"
        barraDeFerramentas={
          <FerramentasDeDetalhe
            mostrarBotaoNovo={id !== "nova"}
            mostrarBotaoApagar={id !== "nova"}
          />
        }
      >
        {" "}
      </LayoutBaseDePagina>
    </div>
  );
};
