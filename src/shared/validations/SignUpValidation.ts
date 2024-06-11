import * as Yup from "yup";

export const SignUpValidationSchema = Yup.object().shape({
  nome: Yup.string().required().min(3).max(100),
  email: Yup.string().email().required().min(3).max(100),
  senha: Yup.string().required().min(6).max(100),
  confirmarSenha: Yup.string().required().min(6).max(100),
});
