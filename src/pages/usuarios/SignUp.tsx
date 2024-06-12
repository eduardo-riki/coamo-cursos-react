import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { SignUpValidationSchema } from "../../shared/validations";
import { VTextField } from "../../shared/forms/VTextField";
import { UsuarioServices } from "../../shared/services/api";
import { enqueueSnackbar } from "notistack";

export type TDetalhesSignUp = {
  nome: string;
  email: string;
  senha: string;
  confirmarSenha: string;
};

export const SignUp: React.FC = () => {
  const navigate = useNavigate();

  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<TDetalhesSignUp>({
    resolver: yupResolver(SignUpValidationSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: TDetalhesSignUp) => {
    const { confirmarSenha, ...usuarioData } = data;

    if (usuarioData.senha !== confirmarSenha) {
      enqueueSnackbar("As senhas não conferem!", {
        variant: "error",
        anchorOrigin: { vertical: "top", horizontal: "center" },
      });
      return;
    }

    const result = await UsuarioServices.create(usuarioData);
    if (result instanceof Error) {
      enqueueSnackbar(result.message, {
        variant: "error",
        anchorOrigin: { vertical: "top", horizontal: "center" },
      });
    } else {
      enqueueSnackbar("Cadastro efetuado com sucesso!", {
        variant: "success",
        anchorOrigin: { vertical: "top", horizontal: "center" },
      });
      navigate("/login");
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 1,
          minHeight: 300,
          width: 275,
        }}
      >
        <CardContent>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap={2}
          >
            <Typography variant="h5" fontWeight={500}>
              Cadastrar
            </Typography>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              width="100%"
              gap={1}
            >
              <VTextField
                name="nome"
                label="Nome Completo"
                type="text"
                register={register}
                error={errors.nome?.message}
              />
              <VTextField
                name="email"
                label="E-mail"
                type="email"
                register={register}
                error={errors.email?.message}
              />
              <VTextField
                name="senha"
                label="Senha"
                type="password"
                register={register}
                error={errors.senha?.message}
              />
              <VTextField
                name="confirmarSenha"
                label="Confirme sua senha"
                type="password"
                register={register}
                error={errors.confirmarSenha?.message}
              />
            </Box>
          </Box>
        </CardContent>
        <CardActions>
          <Box
            width="100%"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="space-between"
            gap={2}
          >
            <Button
              variant="contained"
              onClick={handleSubmit(onSubmit)}
              sx={{ width: "90%" }}
            >
              Entrar
            </Button>
            <Button
              variant="text"
              size="small"
              onClick={() => navigate("/login")}
            >
              Já possui conta?
            </Button>
          </Box>
        </CardActions>
      </Card>
    </Box>
  );
};
