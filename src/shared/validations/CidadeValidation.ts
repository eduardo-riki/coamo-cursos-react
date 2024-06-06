import * as Yup from "yup";

export const CidadeValidationSchema = Yup.object().shape({
  nome: Yup
    .string()
    .required("Nome da cidade é obrigatório.")
    .min(3, "Nome deve ter no mínimo 3 caracteres.")
    .max(50, "Nome deve ter no máximo 100 caracteres."),
  estado: Yup
    .string()
    .required("Nome do Estado é obrigatório.")
    .min(3, "Estado deve ter no mínimo 3 caracteres.")
    .max(50, "Estado deve ter no máximo 100 caracteres."),
});
