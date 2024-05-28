import { Box } from "@mui/system";
import {
  IconButton,
  Icon,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useAppDrawerContext } from "../contexts";

interface ILayoutBaseDePaginaProps {
  children: React.ReactNode;
  titulo: string;
}

export const LayoutBaseDePagina: React.FC<ILayoutBaseDePaginaProps> = ({
  children,
  titulo,
}) => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.up("sm"));
  const { toggleDrawerOpen } = useAppDrawerContext();

  return (
    <Box height="100%" display="flex" flexDirection="column" gap={1}>
      <Box
        padding={1}
        height={theme.spacing(12)}
        display="flex"
        alignItems="center"
      >
        {smDown && (
          <IconButton onClick={toggleDrawerOpen}>
            <Icon>menu</Icon>
          </IconButton>
        )}
        <Typography variant="h5">{titulo}</Typography>
      </Box>
      <Box>Barra de ferramenta</Box>
      <Box>{children}</Box>
    </Box>
  );
};
