import { useNavigate, useParams } from "react-router-dom";
import { LayoutBaseDePagina } from "../../shared/layouts";
import { FerramentasDeDetalhe } from "../../shared/components";
import { useEffect, useState } from "react";
import { CidadesServices } from "../../shared/services/api/cidades/CidadesService";
import { Box, Grid, LinearProgress, Paper, TextField } from "@mui/material";
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
    getValues,
    reset,
  } = useForm<IDetalhesDeCidades>({
    defaultValues: {
      nome: "",
      estado: "",
    },
  });

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
          reset(result);
        }
      });
    }
  }, [id, navigate, reset]);

  const handleSave = (data: IDetalhesDeCidades) => {
    setIsLoading(true);
    if (id !== "cadastrar") {
      CidadesServices.updateById(Number(id), { id: Number(id), ...data }).then((result) => {
        setIsLoading(false);
        if (result instanceof Error) {
          alert(result.message);
        } else {
          alert("Registro atualizado com sucesso!");
          navigate("/cidades/detalhe/" + id);
        }
      });
    } else {
      CidadesServices.create(data).then((result) => {
        setIsLoading(false);
        if (result instanceof Error) {
          alert(result.message);
        } else {
          alert("Registro cadastrado com sucesso!");
          navigate("/cidades/detalhe/" + result);
        }
      });
    }
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

  const onSubmit = (data: IDetalhesDeCidades) => handleSave(data);

  return (
    <div>
      <LayoutBaseDePagina
        titulo={id === "cadastrar" ? "Cadastrar nova cidade" : getValues("nome")}
        barraDeFerramentas={
          <FerramentasDeDetalhe
            mostrarBotaoSalvarEVoltar
            mostrarBotaoNovo={id !== "cadastrar"}
            mostrarBotaoApagar={id !== "cadastrar"}
            aoSalvar={handleSubmit(onSubmit)}
            aoSalvarEVoltar={handleSubmit(onSubmit)}
            aoApagar={() => handleDelete(Number(id))}
            aoCriarNovo={() => navigate("/cidades/detalhe/cadastrar")}
            aoVoltar={() => navigate("/cidades")}
          />
        }
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box margin={1} display="flex" flexDirection="column" component={Paper} variant="outlined">
            {isLoading ? (
              <LinearProgress variant="indeterminate" />
            ) : (
              <Grid container direction="column" padding={2} spacing={2}>
                <Grid container item direction="row" spacing={2}>
                  <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                    <TextField
                      size="small"
                      fullWidth
                      error={Boolean(errors?.nome)}
                      helperText={
                        errors?.nome?.type === "required" && "Nome da cidade é obrigatório."
                      }
                      type="text"
                      label="Nome da cidade"
                      {...register("nome", { required: true })}
                    />
                  </Grid>
                </Grid>
                <Grid container item direction="row" spacing={2}>
                  <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                    <TextField
                      size="small"
                      fullWidth
                      error={Boolean(errors?.estado)}
                      helperText={
                        errors?.estado?.type === "required" &&
                        "Nome do Estado é obrigatório."
                      }
                      type="text"
                      label="Nome do Estado"
                      {...register("estado", { required: true })}
                    />
                  </Grid>
                </Grid>
              </Grid>
            )}
          </Box>
        </form>
      </LayoutBaseDePagina>
    </div >
  );
};
