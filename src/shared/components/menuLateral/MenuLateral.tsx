import {
  Avatar,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { Box } from "@mui/system";
import { useAppDrawerContext } from "../../contexts";

interface IMenuLateralProps {
  children: React.ReactNode;
}

interface IListItemLinkProps {
  to: string;
  icon: string;
  label: string;
  onClick: () => void;
}

const ListItemLink: React.FC<IListItemLinkProps> = ({
  to,
  icon,
  label,
  onClick,
}) => {
  return <ListItem></ListItem>;
};

export const MenuLateral: React.FC<IMenuLateralProps> = ({ children }) => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.up("sm"));
  const { isDrawerOpen, toggleDrawerOpen } = useAppDrawerContext();

  return (
    <>
      <Drawer
        open={isDrawerOpen}
        variant={smDown ? "temporary" : "permanent"}
        onClose={toggleDrawerOpen}
      >
        <Box
          width={theme.spacing(28)}
          height="100%"
          display="flex"
          flexDirection="column"
        >
          <Box
            height={theme.spacing(20)}
            width="100%"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Avatar
              alt="Foto de Perfil"
              sx={{ width: theme.spacing(12), height: theme.spacing(12) }}
            >
              E
            </Avatar>
          </Box>

          <Divider />

          <Box flex={1}>
            <nav aria-label="nav">
              <List>
                <ListItem disablePadding>
                  <ListItemButton href="/pagina-inicial">
                    <ListItemIcon>
                      <HomeIcon />
                    </ListItemIcon>
                    <ListItemText primary="Página Inicial" />
                  </ListItemButton>
                </ListItem>
              </List>
            </nav>
          </Box>
        </Box>
      </Drawer>

      <Box height="100vh" marginLeft={smDown ? 0 : theme.spacing(28)}>
        {children}
      </Box>
    </>
  );
};
