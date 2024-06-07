import { useNavigate, useParams } from "react-router-dom";
import { Box, Grid, LinearProgress, Paper, Typography } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { CidadesServices } from "../../shared/services/api";
import { LayoutBaseDePagina } from "../../shared/layouts";
import { FerramentasDeDetalhe } from "../../shared/components";
import { CidadeValidationSchema } from "../../shared/validations";
import { VTextField } from "../../shared/forms/VTextField";

type TDetalhesDeCidades = {
  nome: string;
  estado: string;
}

export const DetalhesDeCidades = () => {
  const { id = "cadastrar" } = useParams<"id">();
  const navigate = useNavigate();

  const {
    control,
    formState: { errors, isLoading, isSubmitting },
    handleSubmit,
    register,
  } = useForm<TDetalhesDeCidades>({
    defaultValues: async () => {
      if (id !== "cadastrar") {
        const result = await CidadesServices.getById(Number(id));
        if (result instanceof Error) {
          alert(result.message);
          navigate("/cidades");
        } else {
          return result;
        }
      }
      return { nome: "", estado: "" };
    },
    resolver: yupResolver(CidadeValidationSchema),
    mode: "onChange",
  });

  const onSubmit = (data: TDetalhesDeCidades) => handleSave(data);

  const handleSave = (data: TDetalhesDeCidades) => {
    if (id !== "cadastrar") {
      CidadesServices.updateById(Number(id), { id: Number(id), ...data }).then(
        (result) => {
          if (result instanceof Error) {
            alert(result.message);
          } else {
            alert("Registro atualizado com sucesso!");
            navigate("/cidades/detalhe/" + id);
          }
        }
      ); return true;
    }

    CidadesServices.create(data).then((result) => {
      if (result instanceof Error) {
        alert(result.message);
      } else {
        alert("Registro cadastrado com sucesso!");
        navigate("/cidades/detalhe/" + result);
      } return true;
    });
  }

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

  return (
    <LayoutBaseDePagina
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
      <Box
        component={Paper}
        onSubmit={handleSubmit(onSubmit)}
        margin={1}
      >
        {(isLoading || isSubmitting) ? (
          <LinearProgress variant="indeterminate" />
        ) : (
          <Grid container direction="column" padding={2} spacing={2}>
            <Grid item>
              <Typography variant="h6">
                {id === "cadastrar"
                  ? "Cadastrar nova cidade"
                  : "Editar cidade"}
              </Typography>
            </Grid>
            <Grid container item direction="row" spacing={2}>
              <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                <Controller
                  name="nome"
                  control={control}
                  render={({ field }) => (
                    <VTextField
                      name="nome"
                      label={id !== "cadastrar" ? "" : "Nome da cidade"}
                      type="text"
                      register={register}
                      error={errors.nome?.message}
                    />
                  )}
                />
              </Grid>
            </Grid>
            <Grid container item direction="row" spacing={2}>
              <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                <Controller
                  name="estado"
                  control={control}
                  render={({ field }) => (
                    <VTextField
                      name={field.name}
                      label={id !== "cadastrar" ? "" : "Nome do Estado"}
                      type="text"
                      register={register}
                      error={errors.estado?.message}
                    />
                  )}
                />
              </Grid>
            </Grid>
          </Grid>
        )}
      </Box>
    </LayoutBaseDePagina>
  );
};
