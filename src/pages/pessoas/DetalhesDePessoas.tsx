import { Box, Grid, LinearProgress, Paper, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { PessoasServices } from "../../shared/services/api";
import { LayoutBaseDePagina } from "../../shared/layouts";
import { FerramentasDeDetalhe } from "../../shared/components";
import { VTextField } from "../../shared/forms/VTextField";
import { PessoaValidationSchema } from "../../shared/validations";

export type TDetalhesDePessoas = {
  nomeCompleto: string;
  email: string;
  cidadeId: number;
};

export const DetalhesDePessoas = () => {
  const { id } = useParams<"id">() as { id: string };
  const isCadastro = id === "cadastrar" ? true : false;

  const navigate = useNavigate();

  const {
    formState: { errors, isLoading },
    handleSubmit,
    register,
    reset,
  } = useForm<TDetalhesDePessoas>({
    defaultValues: async () => {
      if (!isCadastro) {
        const result = await PessoasServices.getById(Number(id));
        if (result instanceof Error) {
          alert(result.message);
          return { nomeCompleto: "", email: "", cidadeId: 0 };
        }
        return result;
      }
      return { nomeCompleto: "", email: "", cidadeId: 0 };
    },
    resolver: yupResolver(PessoaValidationSchema),
    mode: "onChange",
  });

  const onSubmit = (data: TDetalhesDePessoas) => {
    console.log(isCadastro);
    if (isCadastro) {
      handleSave(data);
    } else {
      console.log(data);
      handleEdit(data);
    }
  };

  const handleSave = async (data: TDetalhesDePessoas) => {
    const result = await PessoasServices.create(data);
    if (result instanceof Error) {
      alert(result.message);
    } else {
      alert("Registro cadastrado com sucesso!");
    }
  };

  const handleEdit = async (data: TDetalhesDePessoas) => {
    const result = await PessoasServices.updateById(Number(id), {
      id: Number(id),
      ...data,
    });
    if (result instanceof Error) {
      alert(result.message);
    } else {
      alert("Registro atualizado com sucesso!");
    }
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Deseja realmente remover este registro?")) {
      PessoasServices.deleteById(id).then((result) => {
        if (result instanceof Error) {
          alert(result.message);
        } else {
          alert("Registro apagado com sucesso!");
          navigate("/pessoas");
        }
      });
    }
  };

  return (
    <LayoutBaseDePagina
      barraDeFerramentas={
        <FerramentasDeDetalhe
          mostrarBotaoSalvarEVoltar
          mostrarBotaoNovo={!isCadastro}
          mostrarBotaoApagar={!isCadastro}
          aoSalvar={handleSubmit(onSubmit)}
          aoSalvarEVoltar={async () => {
            await handleSubmit(onSubmit)();
            navigate("/cidades");
          }}
          aoApagar={() => handleDelete(Number(id))}
          aoCriarNovo={async () => {
            await reset({ nomeCompleto: "", email: "", cidadeId: 0 });
            navigate("/cidades/detalhe/cadastrar");
          }}
          aoVoltar={() => navigate("/cidades")}
        />
      }
    >
      <Box component={Paper} onSubmit={handleSubmit(onSubmit)} margin={1}>
        {isLoading ? (
          <LinearProgress variant="indeterminate" />
        ) : (
          <Grid container direction="column" padding={2} spacing={2}>
            <Grid item>
              <Typography variant="h6">
                {isCadastro ? "Cadastrar nova cidade" : "Editar cidade"}
              </Typography>
            </Grid>
            <Grid container item direction="row" spacing={2}>
              <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                <VTextField
                  name="nomeCompleto"
                  label="Nome Completo"
                  type="text"
                  register={register}
                  error={errors.nomeCompleto?.message}
                />
              </Grid>
            </Grid>
            <Grid container item direction="row" spacing={2}>
              <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                <VTextField
                  name="email"
                  label="E-mail"
                  type="text"
                  register={register}
                  error={errors.email?.message}
                />
              </Grid>
            </Grid>
            <Grid container item direction="row" spacing={2}>
              <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                <VTextField
                  name="cidadeId"
                  label="Cidade"
                  type="text"
                  register={register}
                  error={errors.cidadeId?.message}
                />
              </Grid>
            </Grid>
          </Grid>
        )}
      </Box>
    </LayoutBaseDePagina>
  );
};
