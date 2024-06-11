import * as Yup from "yup";

export const SignInValidationSchema = Yup.object().shape({
  email: Yup.string().email().required().min(3).max(100),
  senha: Yup.string().required().min(6).max(100),
});
