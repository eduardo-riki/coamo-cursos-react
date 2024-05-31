import {
  Box,
  Button,
  Icon,
  Paper,
  Skeleton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

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
  const smDown = useMediaQuery(theme.breakpoints.down("sm"));
  const mdDown = useMediaQuery(theme.breakpoints.down("md"));

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
      {mostrarBotaoSalvar && !mostrarBotaoSalvarCarregando && (
        <Button
          variant="contained"
          startIcon={!smDown && <Icon>save</Icon>}
          onClick={aoSalvar}
        >
          {!smDown ? (
            <Typography
              variant="button"
              whiteSpace="nowrap"
              textOverflow="ellipsis"
              overflow=""
            >
              Salvar
            </Typography>
          ) : (
            <Icon>save</Icon>
          )}
        </Button>
      )}

      {mostrarBotaoSalvarCarregando && <Skeleton width={100} height={60} />}

      {mostrarBotaoSalvarEVoltar &&
        !mostrarBotaoSalvarEVoltarCarregando &&
        !mdDown && (
          <Button
            variant="outlined"
            startIcon={!smDown && <Icon>save</Icon>}
            onClick={aoSalvarEVoltar}
          >
            {!smDown ? (
              <Typography
                variant="button"
                whiteSpace="nowrap"
                textOverflow="ellipsis"
                overflow="hidden"
              >
                Salvar e voltar
              </Typography>
            ) : (
              <Icon>save</Icon>
            )}
          </Button>
        )}

      {mostrarBotaoSalvarEVoltarCarregando && !mdDown && (
        <Skeleton width={180} height={60} />
      )}

      {mostrarBotaoApagar && !mostrarBotaoApagarCarregando && (
        <Button
          variant="outlined"
          startIcon={!smDown && <Icon>delete</Icon>}
          onClick={aoApagar}
        >
          {!smDown ? (
            <Typography
              variant="button"
              whiteSpace="nowrap"
              textOverflow="ellipsis"
              overflow="hidden"
            >
              Apagar
            </Typography>
          ) : (
            <Icon>delete</Icon>
          )}
        </Button>
      )}

      {mostrarBotaoApagarCarregando && <Skeleton width={100} height={60} />}

      {mostrarBotaoNovo &&
        !mostrarBotaoNovoCarregando &&
        (smDown || !mdDown) && (
          <Button
            variant="outlined"
            startIcon={!smDown && <Icon>add</Icon>}
            onClick={aoCriarNovo}
          >
            {!smDown ? (
              <Typography
                variant="button"
                whiteSpace="nowrap"
                textOverflow="ellipsis"
                overflow="hidden"
              >
                Novo
              </Typography>
            ) : (
              <Icon>add</Icon>
            )}
          </Button>
        )}

      {mostrarBotaoNovoCarregando && !mdDown && (
        <Skeleton width={100} height={60} />
      )}

      {mostrarBotaoVoltar && !mostrarBotaoVoltarCarregando && (
        <Button
          variant="outlined"
          startIcon={!smDown && <Icon>arrow_back</Icon>}
          onClick={aoVoltar}
        >
          {!smDown ? (
            <Typography
              variant="button"
              whiteSpace="nowrap"
              textOverflow="ellipsis"
              overflow="hidden"
            >
              Voltar
            </Typography>
          ) : (
            <Icon>arrow_back</Icon>
          )}
        </Button>
      )}

      {mostrarBotaoVoltarCarregando && <Skeleton width={100} height={60} />}
    </Box>
  );
};
