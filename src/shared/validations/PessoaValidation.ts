import * as Yup from "yup";

export const PessoaValidationSchema = Yup.object().shape({
  nomeCompleto: Yup.string().required().min(3).max(100),
  email: Yup.string().email().required().min(3).max(100),
  cidadeId: Yup.number().required().min(1),
});
