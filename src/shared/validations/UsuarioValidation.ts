import * as Yup from "yup";

export const UsuarioValidationSchema = Yup.object().shape({
  email: Yup.string().email().required().min(3).max(100),
  senha: Yup.string().required().min(6).max(100),
});
