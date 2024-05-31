import { Box, Button, Icon, Paper, TextField, useTheme } from "@mui/material";

interface IFerramentasDaListagemProps {
  textoDaBusca?: string;
  mostrarCampoDeBusca?: boolean;
  aoMudarTextoDaBusca?: (texto: string) => void;
  aoClicarEmNovo?: () => void;
  textoDoBotaoNovo?: string;
  mostrarBotaoNovo?: boolean;
}

export const FerramentasDaListagem: React.FC<IFerramentasDaListagemProps> = ({
  textoDaBusca = "",
  mostrarCampoDeBusca = false,
  aoMudarTextoDaBusca,
  aoClicarEmNovo,
  textoDoBotaoNovo = "Novo",
  mostrarBotaoNovo = true,
}) => {
  const theme = useTheme();
  return (
    <Box
      component={Paper}
      height={theme.spacing(5)}
      marginX={1}
      padding={1}
      paddingX={2}
      display="flex"
      alignItems="center"
      gap={1}
    >
      {mostrarCampoDeBusca && (
        <TextField
          size="small"
          placeholder="Pesquisar..."
          value={textoDaBusca}
          onChange={(e) => aoMudarTextoDaBusca?.(e.target.value)}
          fullWidth
        />
      )}

      <Box flex={1} display="flex" justifyContent="end">
        {mostrarBotaoNovo && (
          <Button
            variant="contained"
            endIcon={<Icon>add</Icon>}
            onClick={aoClicarEmNovo}
          >
            {textoDoBotaoNovo}
          </Button>
        )}
      </Box>
    </Box>
  );
};
