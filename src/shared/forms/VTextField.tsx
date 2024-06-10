import { TextField } from "@mui/material";
import { UseFormRegister } from "react-hook-form";

import { TDetalhesDeCidades, TDetalhesDePessoas, TDetalhesDeUsuarios } from "../../pages";

type TDetalhesDeCidadesEPessoas = TDetalhesDeCidades & TDetalhesDePessoas & TDetalhesDeUsuarios;

export const VTextField = ({
  name,
  label,
  type,
  register,
  error,
}: {
  name: keyof TDetalhesDeCidadesEPessoas;
  label: string;
  type: string;
  register: UseFormRegister<any>;
  error: string | undefined;
}) => {
  return (
    <TextField
      variant="outlined"
      size="small"
      fullWidth
      required
      error={!!error}
      helperText={error}
      type={type}
      label={label}
      {...register(name, { required: true })}
    />
  );
};
