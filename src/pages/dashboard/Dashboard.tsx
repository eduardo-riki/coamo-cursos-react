import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Icon,
  LinearProgress,
  Typography,
} from "@mui/material";

import { CidadesServices } from "../../shared/services/api/cidades/CidadesServices";
import { PessoasServices } from "../../shared/services/api/pessoas/PessoasServices";
import { FerramentasDaListagem } from "../../shared/components";
import { LayoutBaseDePagina } from "../../shared/layouts";
import { useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";

export const Dashboard = () => {
  const [isLoadingCidades, setIsLoadingCidades] = useState(true);
  const [isLoadingPessoas, setIsLoadingPessoas] = useState(true);
  const [totalCountCidades, setTotalCountCidades] = useState(0);
  const [totalCountPessoas, setTotalCountPessoas] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    setIsLoadingCidades(true);
    setIsLoadingPessoas(true);

    CidadesServices.getAll().then((result) => {
      setIsLoadingCidades(false);

      if (result instanceof Error) {
        enqueueSnackbar(result.message, {
          variant: "error",
          anchorOrigin: { vertical: "top", horizontal: "center" },
        });
      } else {
        setTotalCountCidades(result.totalCount);
      }
    });
    PessoasServices.getAll().then((result) => {
      setIsLoadingPessoas(false);

      if (result instanceof Error) {
        enqueueSnackbar(result.message, {
          variant: "error",
          anchorOrigin: { vertical: "top", horizontal: "center" },
        });
      } else {
        setTotalCountPessoas(result.totalCount);
      }
    });
  }, []);

  return (
    <LayoutBaseDePagina
      barraDeFerramentas={<FerramentasDaListagem mostrarBotaoNovo={false} />}
    >
      <Box width="100%" display="flex">
        <Grid container margin={2}>
          <Grid item container spacing={2}>
            <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
              <Card>
                <CardContent>
                  <Typography variant="h5" align="center">
                    Total de cidades
                  </Typography>

                  <Box
                    padding={3}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    {!isLoadingCidades ? (
                      <Box
                        display="flex"
                        flexDirection="column"
                        justifyContent="center"
                        alignItems="center"
                        gap={3}
                      >
                        <Typography variant="h1" fontWeight="500">
                          {totalCountCidades}
                        </Typography>
                        <Button
                          variant="contained"
                          endIcon={<Icon>search</Icon>}
                          onClick={() => navigate("/cidades")}
                        >
                          Ver mais
                        </Button>
                      </Box>
                    ) : (
                      <LinearProgress
                        variant="indeterminate"
                        style={{ width: "100%" }}
                      />
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
              <Card>
                <CardContent>
                  <Typography variant="h5" align="center">
                    Total de pessoas
                  </Typography>

                  <Box
                    padding={3}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    {!isLoadingPessoas ? (
                      <Box
                        display="flex"
                        flexDirection="column"
                        justifyContent="center"
                        alignItems="center"
                        gap={3}
                      >
                        <Typography variant="h1" fontWeight="500">
                          {totalCountPessoas}
                        </Typography>
                        <Button
                          variant="contained"
                          endIcon={<Icon>search</Icon>}
                          onClick={() => navigate("/pessoas")}
                        >
                          Ver mais
                        </Button>
                      </Box>
                    ) : (
                      <LinearProgress
                        variant="indeterminate"
                        style={{ width: "100%" }}
                      />
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </LayoutBaseDePagina>
  );
};
