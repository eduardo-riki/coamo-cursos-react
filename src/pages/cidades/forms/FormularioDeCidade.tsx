import { useForm } from "react-hook-form";
import { TDetalhesDeCidades } from "../DetalhesDeCidades";
import { Box, Grid, LinearProgress, Paper, Typography } from "@mui/material";
import { VTextField } from "../../../shared/forms/VTextField";
import { useCallback, useMemo } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { CidadeValidationSchema } from "../../../shared/validations";
import { LayoutBaseDePagina } from "../../../shared/layouts";
import { FerramentasDeDetalhe } from "../../../shared/components";
import { useNavigate } from "react-router-dom";

export const FormularioDeCidade = ({
  id,
  novaCidade,
  cidade,
  handleSave,
  handleDelete,
}: {
  id: string;
  novaCidade: boolean;
  cidade: TDetalhesDeCidades;
  handleSave: (data: TDetalhesDeCidades) => void;
  handleDelete: (id: number) => void;
}) => {
  const navigate = useNavigate();

  const {
    control,
    formState: { errors, isLoading, isSubmitting },
    handleSubmit,
    register,
    reset,
  } = useForm<TDetalhesDeCidades>({
    defaultValues: useMemo(() => {
      return cidade;
    }, [cidade]),
    resolver: yupResolver(CidadeValidationSchema),
    mode: "onChange",
  });

  return (
    <LayoutBaseDePagina
      barraDeFerramentas={
        <FerramentasDeDetalhe
          mostrarBotaoSalvarEVoltar
          mostrarBotaoNovo={!novaCidade}
          mostrarBotaoApagar={!novaCidade}
          aoSalvar={handleSubmit(handleSave)}
          aoSalvarEVoltar={handleSubmit(handleSave)}
          aoApagar={() => handleDelete(Number(id))}
          aoCriarNovo={() => {
            reset({});
            navigate("/cidades/detalhe/cadastrar");
          }}
          aoVoltar={() => navigate("/cidades")}
        />
      }
    >
      <Box component={Paper} onSubmit={handleSubmit(handleSave)} margin={1}>
        {isLoading || isSubmitting ? (
          <LinearProgress variant="indeterminate" />
        ) : (
          <Grid container direction="column" padding={2} spacing={2}>
            <Grid item>
              <Typography variant="h6">
                {novaCidade ? "Cadastrar nova cidade" : "Editar cidade"}
              </Typography>
            </Grid>
            <Grid container item direction="row" spacing={2}>
              <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                <VTextField
                  name="nome"
                  control={control}
                  label="Nome da Cidade"
                  type="text"
                  register={register}
                  error={errors.nome?.message}
                />
              </Grid>
            </Grid>
            <Grid container item direction="row" spacing={2}>
              <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                <VTextField
                  name="estado"
                  control={control}
                  label="Nome do Estado"
                  type="text"
                  register={register}
                  error={errors.estado?.message}
                />
              </Grid>
            </Grid>
          </Grid>
        )}
      </Box>
    </LayoutBaseDePagina>
  );
};
