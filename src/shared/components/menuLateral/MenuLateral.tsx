import {
  Avatar,
  Divider,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
  useMediaQuery,
  Icon,
  Box,
} from "@mui/material";
import { useAppDrawerContext, useAppThemeContext } from "../../contexts";
import { useMatch, useNavigate, useResolvedPath } from "react-router-dom";
import { PropsWithChildren } from "react";
import { useAuthContext } from "../../contexts/AuthContext";

interface IListItemLinkProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  onClick: () => void | undefined;
}

const ListItemLink: React.FC<IListItemLinkProps> = ({
  to,
  icon,
  label,
  onClick,
}) => {
  const navigate = useNavigate();

  const resolvePath = useResolvedPath(to);
  const match = useMatch({ path: resolvePath.pathname, end: false });

  const handleClick = () => {
    navigate(to);
    onClick?.();
  };
  return (
    <ListItemButton onClick={handleClick} selected={!!match}>
      <ListItemIcon>
        <Icon>{icon}</Icon>
      </ListItemIcon>
      <ListItemText primary={label} />
    </ListItemButton>
  );
};

export const MenuLateral: React.FC<PropsWithChildren> = ({ children }) => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down("sm"));
  const { isDrawerOpen, toggleDrawerOpen, drawerOptions } =
    useAppDrawerContext();
  const { toggleTheme,  } = useAppThemeContext();
  const { logout } = useAuthContext();

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
              ER
            </Avatar>
          </Box>

          <Divider />

          <Box
            flex={1}
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
          >
            <List component="nav">
              {drawerOptions.map((drawerOption) => (
                <ListItemLink
                  key={drawerOption.path}
                  icon={drawerOption.icon}
                  label={drawerOption.label}
                  to={drawerOption.path}
                  onClick={toggleDrawerOpen}
                />
              ))}
            </List>
            <List component="nav">
              <ListItemButton onClick={toggleTheme}>
                <ListItemIcon>
                  <Icon>contrast</Icon>
                </ListItemIcon>
                <ListItemText primary="Alterar tema" />
              </ListItemButton>
              <ListItemButton onClick={logout}>
                <ListItemIcon>
                  <Icon>logout</Icon>
                </ListItemIcon>
                <ListItemText primary="Log Out" />
              </ListItemButton>
            </List>
          </Box>
        </Box>
      </Drawer>

      <Box height="100vh" marginLeft={smDown ? 0 : theme.spacing(28)}>
        {children}
      </Box>
    </>
  );
};
