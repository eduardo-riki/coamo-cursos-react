import { useNavigate, useParams } from "react-router-dom";
import { LayoutBaseDePagina } from "../../shared/layouts";
import { FerramentasDeDetalhe } from "../../shared/components";
import { useEffect, useState } from "react";
import { CidadesServices } from "../../shared/services/api/cidades/CidadesService";
import { Box, Button, LinearProgress, TextField } from "@mui/material";
import { useForm } from "react-hook-form";

interface IDetalhesDeCidades {
  nome: string;
  estado: string;
}

export const DetalhesDeCidades = () => {
  const { id = "cadastrar" } = useParams<"id">();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IDetalhesDeCidades>();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (id !== "cadastrar") {
      setIsLoading(true);
      CidadesServices.getById(Number(id)).then((result) => {
        setIsLoading(false);
        if (result instanceof Error) {
          alert(result.message);
          navigate("/cidades");
        } else {
          // setNomeCidade(result.nome);
        }
      });
    }
  }, [id, navigate]);

  const handleSave = () => {
    console.log("Salvado");
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Deseja realmente remover este registro?")) {
      CidadesServices.deleteById(id).then((result) => {
        if (result instanceof Error) {
          alert(result.message);
        } else {
          alert("Registro apagado com sucesso!");
          navigate("/cidades");
        }
      });
    }
  };

  const onSubmit = (data: IDetalhesDeCidades) => console.log(data);

  return (
    <div>
      <LayoutBaseDePagina
        titulo={id === "cadastrar" ? "Cadastrar nova cidade" : "nomeCidade"}
        barraDeFerramentas={
          <FerramentasDeDetalhe
            mostrarBotaoSalvarEVoltar
            mostrarBotaoNovo={id !== "cadastrar"}
            mostrarBotaoApagar={id !== "cadastrar"}
            aoSalvar={() => handleSave}
            aoSalvarEVoltar={() => handleSave}
            aoApagar={() => handleDelete(Number(id))}
            aoCriarNovo={() => navigate("/cidades/detalhe/cadastrar")}
            aoVoltar={() => navigate("/cidades")}
          />
        }
      >
        {isLoading ? (
          <LinearProgress variant="indeterminate" />
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box display="flex" margin={1}>
              <TextField
                size="small"
                error={Boolean(errors?.nome)}
                helperText={
                  errors?.nome?.type === "required" && "Name is required."
                }
                type="text"
                placeholder="Nome da cidade"
                {...register("nome", { required: true })}
              />
              <TextField
                size="small"
                error={Boolean(errors?.estado)}
                helperText={
                  errors?.estado?.type === "required" &&
                  "State name is required."
                }
                type="text"
                placeholder="Nome do Estado"
                {...register("estado", { required: true })}
              />
              <Button type="submit" variant="contained">
                Submit
              </Button>
            </Box>
          </form>
        )}
      </LayoutBaseDePagina>
    </div>
  );
};
