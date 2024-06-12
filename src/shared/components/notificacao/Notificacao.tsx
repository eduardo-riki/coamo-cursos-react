import { useState } from "react";
import { Box, Alert, Snackbar } from "@mui/material";

export const Notificacao = () => {
  const [aberto, setAberto] = useState(false);
  return (
    <Box display="grid" gap={1}>
      <Snackbar
        open={aberto}
        autoHideDuration={5000}
        onClose={() => setAberto(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          severity="success"
          variant="filled"
        ></Alert>
      </Snackbar>
    </Box>
  );
};
