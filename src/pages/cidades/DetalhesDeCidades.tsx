import {
  Box,
  Grid,
  LinearProgress,
  Paper,
  Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { CidadesServices } from "../../shared/services/api";
import { LayoutBaseDePagina } from "../../shared/layouts";
import { FerramentasDeDetalhe } from "../../shared/components";
import { VTextField } from "../../shared/forms/VTextField";
import { CidadeValidationSchema } from "../../shared/validations";

export type TDetalhesDeCidades = {
  nome: string;
  estado: string;
};

export const DetalhesDeCidades = () => {
  const { id } = useParams<"id">() as { id: string };
  const isCadastro = id === "cadastrar" ? true : false;

  const navigate = useNavigate();

  const {
    formState: { errors, isLoading },
    handleSubmit,
    register,
    reset,
  } = useForm<TDetalhesDeCidades>({
    defaultValues: async () => {
      if (!isCadastro) {
        const result = await CidadesServices.getById(Number(id));
        if (result instanceof Error) {
          alert(result.message);
          return { nome: "", estado: "" };
        }
        return result;
      }
      return { nome: "", estado: "" };
    },
    resolver: yupResolver(CidadeValidationSchema),
    mode: "onChange",
  });

  const onSubmit = (data: TDetalhesDeCidades) => {
    console.log(isCadastro);
    if (isCadastro) {
      handleSave(data);
    } else {
      console.log(data);
      handleEdit(data);
    }
  };

  const handleSave = async (data: TDetalhesDeCidades) => {
    const result = await CidadesServices.create(data);
    if (result instanceof Error) {
      alert(result.message);
    } else {
      alert("Registro cadastrado com sucesso!");
    }
  };

  const handleEdit = async (data: TDetalhesDeCidades) => {
    const result = await CidadesServices.updateById(Number(id), {
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
          mostrarBotaoNovo={!isCadastro}
          mostrarBotaoApagar={!isCadastro}
          aoSalvar={handleSubmit(onSubmit)}
          aoSalvarEVoltar={async () => {
            await handleSubmit(onSubmit)();
            navigate("/cidades");
          }}
          aoApagar={() => handleDelete(Number(id))}
          aoCriarNovo={async () => {
            await reset({ nome: "", estado: "" });
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
                  name="nome"
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
