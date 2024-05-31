import { Box, Button, Icon, Paper, Skeleton, useTheme } from "@mui/material";

interface IFerramentasDeDetalheProps {
  mostrarBotaoSalvar?: boolean;
  mostrarBotaoSalvarEVoltar?: boolean;
  mostrarBotaoApagar?: boolean;
  mostrarBotaoNovo?: boolean;
  mostrarBotaoVoltar?: boolean;

  mostrarBotaoSalvarCarregando?: boolean;
  mostrarBotaoSalvarEVoltarCarregando?: boolean;
  mostrarBotaoApagarCarregando?: boolean;
  mostrarBotaoNovoCarregando?: boolean;
  mostrarBotaoVoltarCarregando?: boolean;

  aoSalvar?: () => void;
  aoSalvarEVoltar?: () => void;
  aoApagar?: () => void;
  aoCriarNovo?: () => void;
  aoVoltar?: () => void;

}

export const FerramentasDeDetalhe: React.FC<IFerramentasDeDetalheProps> = ({
  mostrarBotaoSalvar = true,
  mostrarBotaoSalvarEVoltar = false,
  mostrarBotaoApagar = true,
  mostrarBotaoNovo = true,
  mostrarBotaoVoltar = true,

  mostrarBotaoSalvarCarregando = false,
  mostrarBotaoSalvarEVoltarCarregando = false,
  mostrarBotaoApagarCarregando = false,
  mostrarBotaoNovoCarregando = false,
  mostrarBotaoVoltarCarregando = false,

  aoSalvar,
  aoSalvarEVoltar,
  aoApagar,
  aoCriarNovo,
  aoVoltar,
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
      {(mostrarBotaoSalvar && !mostrarBotaoSalvarCarregando) && (
        <Button variant="contained" startIcon={<Icon>save</Icon>} onClick={aoSalvar}>
          Salvar
        </Button>
      )}

      {mostrarBotaoSalvarCarregando && (
        <Skeleton width={100} height={60} />
      )}

      {(mostrarBotaoSalvarEVoltar&& !mostrarBotaoSalvarEVoltarCarregando) && (
        <Button variant="outlined" startIcon={<Icon>save</Icon>} onClick={aoSalvarEVoltar}>
          Salvar e voltar
        </Button>
      )}

      {mostrarBotaoSalvarEVoltarCarregando && (
        <Skeleton width={180} height={60} />
      )}

      {(mostrarBotaoApagar && !mostrarBotaoApagarCarregando) && (
        <Button variant="outlined" startIcon={<Icon>delete</Icon>} onClick={aoApagar}>
          Apagar
        </Button>
      )}

      {mostrarBotaoApagarCarregando && (
        <Skeleton width={100} height={60} />
      )}

      {(mostrarBotaoNovo && !mostrarBotaoNovoCarregando) && (
        <Button variant="outlined" startIcon={<Icon>add</Icon>} onClick={aoCriarNovo}>
          Novo
        </Button>
      )}

      {mostrarBotaoNovoCarregando && (
        <Skeleton width={100} height={60} />
      )}

      {(mostrarBotaoVoltar&& !mostrarBotaoVoltarCarregando) && (
        <Button variant="outlined" startIcon={<Icon>arrow_back</Icon>} onClick={aoVoltar}>
          Voltar
        </Button>
      )}

      {mostrarBotaoVoltarCarregando && (
        <Skeleton width={100} height={60} />
      )}
    </Box>
  );
};
