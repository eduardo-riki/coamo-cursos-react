import React, { useEffect } from "react";
import { Box, Collapse, Alert, IconButton, Icon } from "@mui/material";

export const Notificacao: React.FC<{
  mensagem: string;
  tipo: "success" | "error";
  aberto: boolean;
  setAberto: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ mensagem, tipo, aberto, setAberto }) => {
  useEffect(() => {
    if (aberto) {
      const timer = setTimeout(() => {
        setAberto(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [aberto, setAberto]);

  return (
    <Box position="absolute" margin={2} right={0}>
      <Collapse in={aberto}>
        <Alert
          variant="filled"
          severity={tipo}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setAberto(false);
              }}
            >
              <Icon fontSize="inherit">close</Icon>
            </IconButton>
          }
        >
          {mensagem}
        </Alert>
      </Collapse>
    </Box>
  );
};
