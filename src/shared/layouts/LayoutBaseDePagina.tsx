import {
  IconButton,
  Icon,
  useTheme,
  useMediaQuery,
  Box,
} from "@mui/material";
import { useAppDrawerContext } from "../contexts";
import { ReactNode } from "react";

interface ILayoutBaseDePaginaProps {
  children: React.ReactNode;
  barraDeFerramentas?: ReactNode;
}

export const LayoutBaseDePagina: React.FC<ILayoutBaseDePaginaProps> = ({
  children,
  barraDeFerramentas,
}) => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down("sm"));
  const { toggleDrawerOpen } = useAppDrawerContext();

  return (
    <Box height="100%" display="flex" flexDirection="column" gap={1}>
      <Box
        paddingX={1}
        display="flex"
        alignItems="center"
      >
        {smDown && (
          <IconButton onClick={toggleDrawerOpen}>
            <Icon>menu</Icon>
          </IconButton>
        )}
      </Box>
      <Box>{barraDeFerramentas}</Box>
      <Box flex={1} overflow="auto">
        {children}
      </Box>
    </Box>
  );
};
