import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { PropsWithChildren } from "react";
import { useAuthContext } from "../../shared/contexts/AuthContext";
import { UsuarioValidationSchema } from "../../shared/validations";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { VTextField } from "../../shared/forms/VTextField";

export type TDetalhesDeUsuarios = {
  email: string;
  senha: string;
};

export const Login: React.FC<PropsWithChildren> = ({ children }) => {
  const { isAuthenticated, login } = useAuthContext();

  const {
    formState: { errors },
    handleSubmit,
    register,
    getValues,
  } = useForm<TDetalhesDeUsuarios>({
    resolver: yupResolver(UsuarioValidationSchema),
    mode: "onChange",
  });

  const onSubmit = () => {
    const { email, senha } = getValues();
    UsuarioValidationSchema.validate({ email, senha }, { abortEarly: false })
      .then((result) => {
        login(result.email, result.senha).then(() => {
          alert("Login efetuado com sucesso!");
        });
      })
      .catch((err) => {
        alert("Erro no login.");
        console.log(err.message);
      });
  };

  if (isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Card>
        <CardContent>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap={1}
          >
            <Typography variant="h5" fontWeight={500}>
              Login
            </Typography>
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
          </Box>
        </CardContent>
        <CardActions>
          <Box width="100%" display="flex" justifyContent="center">
            <Button
              variant="contained"
              fullWidth
              onClick={handleSubmit(onSubmit)}
            >
              Entrar
            </Button>
          </Box>
        </CardActions>
      </Card>
    </Box>
  );
};
