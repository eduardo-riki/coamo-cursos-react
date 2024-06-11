import { TextField, Typography } from "@mui/material";
import { UseFormRegister } from "react-hook-form";

import {
  TDetalhesDeCidades,
  TDetalhesDePessoas,
  TDetalhesSignIn,
  TDetalhesSignUp,
} from "../../pages";

type TDetalhes = TDetalhesDeCidades &
  TDetalhesDePessoas &
  TDetalhesSignIn &
  TDetalhesSignUp;

export const VTextField = ({
  name,
  label,
  type,
  register,
  error,
}: {
  name: keyof TDetalhes;
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
      helperText={<Typography fontSize={10}>{error}</Typography>}
      type={type}
      label={label}
      {...register(name, { required: true })}
    />
  );
};
