import { useNavigate, useParams } from "react-router-dom";
import { LayoutBaseDePagina } from "../../shared/layouts";
import { FerramentasDeDetalhe } from "../../shared/components";
import { useEffect } from "react";
import { CidadesServices } from "../../shared/services/api/cidades/CidadesService";
import {
  Box,
  Grid,
  LinearProgress,
  Paper,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { CidadeValidationSchema } from "../../shared/validations";
import { yupResolver } from "@hookform/resolvers/yup";
import { VTextField } from "../../shared/forms/VTextField";

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
    reset,
    formState: { isSubmitting, isLoading, errors },
  } = useForm<IDetalhesDeCidades>({
    defaultValues: {
      nome: "",
      estado: "",
    },
    resolver: yupResolver(CidadeValidationSchema),
  });

  useEffect(() => {
    if (id !== "cadastrar") {
      CidadesServices.getById(Number(id)).then((result) => {
        if (result instanceof Error) {
          alert(result.message);
          // navigate("/cidades");
        } else {
          reset(result);
        }
      });
    }
  }, [id, reset]);

  const handleSave = (data: IDetalhesDeCidades) => {
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
      );
    } else {
      CidadesServices.create(data).then((result) => {
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box margin={1} display="flex" flexDirection="column" component={Paper}>
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
                  <VTextField
                    label={id !== "cadastrar" ? "" : "Nome da cidade"}
                    name="nome"
                    type="text"
                    register={register}
                    error={errors.nome?.message}
                  />
                </Grid>
              </Grid>
              <Grid container item direction="row" spacing={2}>
                <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                  <VTextField
                    label={id !== "cadastrar" ? "" : "Nome do Estado"}
                    name="estado"
                    type="text"
                    register={register}
                    error={errors.estado?.message}
                  />
                </Grid>
              </Grid>
            </Grid>
          )}
        </Box>
      </form>
    </LayoutBaseDePagina>
  );
};
