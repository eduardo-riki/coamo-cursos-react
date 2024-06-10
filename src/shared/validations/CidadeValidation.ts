import * as Yup from "yup";

export const CidadeValidationSchema = Yup.object().shape({
  nome: Yup.string().required().min(3).max(50),
  estado: Yup.string().required().min(3).max(50),
});
