import { TextField } from '@mui/material';
import { UseFormRegister } from 'react-hook-form';

export const VTextField = ({ label, name, type, register, error }: { 
  label: string, 
  name: string, 
  type: string, 
  register: UseFormRegister<any>,
  error: string | undefined 
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
  )
}
