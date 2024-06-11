import { PropsWithChildren, useState } from "react";
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

import { useAuthContext } from "../../shared/contexts/AuthContext";
import { SignInValidationSchema } from "../../shared/validations";
import { VTextField } from "../../shared/forms/VTextField";
import { Notificacao } from "../../shared/components";

export type TDetalhesSignIn = {
  email: string;
  senha: string;
};

export const SignIn: React.FC<PropsWithChildren> = ({ children }) => {
  const { isAuthenticated, login } = useAuthContext();
  const navigate = useNavigate();

  const {
    formState: { errors },
    handleSubmit,
    register,
    getValues,
    setValue,
  } = useForm<TDetalhesSignIn>({
    resolver: yupResolver(SignInValidationSchema),
    mode: "onChange",
  });

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState<"success" | "error">("success");

  const onSubmit = () => {
    const { email, senha } = getValues();
    SignInValidationSchema.validate({ email, senha }, { abortEarly: false })
      .then((result) => {
        login(result.email, result.senha)
          .then(() => {
            setAlertMessage("Login efetuado com sucesso!");
            setAlertType("success");
            setAlertOpen(true);
          })
          .catch(() => {
            setAlertMessage("E-mail e/ou senha incorretos!");
            setAlertType("error");
            setAlertOpen(true);
            setValue("email", "", { shouldValidate: true });
            setValue("senha", "", { shouldValidate: true });
          });
      })
      .catch(() => {
        setAlertMessage("Erro no login!");
        setAlertType("error");
        setAlertOpen(true);
      });
  };

  if (isAuthenticated) {
    return <>{children}</>;
  }

  console.log("render");

  return (
    <Box>
      <Notificacao
        mensagem={alertMessage}
        tipo={alertType}
        aberto={alertOpen}
        setAberto={setAlertOpen}
      />
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
                Login
              </Typography>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                width="100%"
                gap={1}
              >
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
                onClick={() => navigate("/cadastro")}
              >
                Registrar-se
              </Button>
            </Box>
          </CardActions>
        </Card>
      </Box>
    </Box>
  );
};
