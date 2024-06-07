import { TextField } from "@mui/material";
import { Control, Controller, UseFormRegister } from "react-hook-form";
import { TDetalhesDeCidades } from "../../pages";

export const VTextField = ({
  name,
  control,
  label,
  type,
  register,
  error,
}: {
  name: string;
  control: Control<TDetalhesDeCidades, any>;
  label: string;
  type: string;
  register: UseFormRegister<any>;
  error: string | undefined;
}) => {
  return (
    <Controller
      name={name as "nome" | "estado"}
      control={control}
      render={({ field }) => (
        <TextField
          variant="outlined"
          size="small"
          fullWidth
          required
          error={!!error}
          helperText={error}
          type={type}
          label={label}
          {...register(field.name, { required: true })}
        />
      )}
    />
  );
};
