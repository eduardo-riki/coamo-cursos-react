import { useEffect, useMemo, useState } from "react";
import { FerramentasDaListagem } from "../../shared/components";
import { LayoutBaseDePagina } from "../../shared/layouts";
import {
  CidadesServices,
  IListagemCidade,
} from "../../shared/services/api/cidades/CidadesService";
import { useSearchParams } from "react-router-dom";
import { UseDebounce } from "../../shared/hooks/UseDebounce";
import {
  Icon,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

export const ListagemDeCidade: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { debounce } = UseDebounce(300, true);

  const [cidades, setCidades] = useState<IListagemCidade[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const pesquisa = useMemo(() => {
    return searchParams.get("pesquisa") || "";
  }, [searchParams]);

  const pagina = useMemo(() => {
    return Number(searchParams.get("pagina") || "1");
  }, [searchParams]);

  useEffect(() => {
    setIsLoading(true);

    debounce(() => {
      CidadesServices.getAll(pagina, pesquisa).then((result) => {
        setIsLoading(false);
        if (result instanceof Error) {
          alert(result.message);
        } else {
          setCidades(result.data);
          setTotalCount(result.totalCount);
        }
      });
    });
  }, [debounce, pagina, pesquisa]);

  return (
    <LayoutBaseDePagina
      titulo="Lista de Cidades"
      barraDeFerramentas={
        <FerramentasDaListagem
          mostrarCampoDeBusca
          textoDaBusca={pesquisa}
          aoMudarTextoDaBusca={(texto) =>
            setSearchParams({ pesquisa: texto }, { replace: true })
          }
        />
      }
    >
      <TableContainer
        component={Paper}
        variant="outlined"
        sx={{ m: 1, width: "auto" }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Ações</TableCell>
              <TableCell>Nome</TableCell>
              <TableCell>Estado</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cidades.map((cidade) => (
              <TableRow key={cidade.id}>
                <TableCell>
                  <IconButton
                    // onClick={() => handleEdit(cidade.id)}
                    aria-label="Editar"
                  >
                    <Icon>edit</Icon>
                  </IconButton>
                  <IconButton
                    // onClick={() => handleRemove(cidade.id)}
                    aria-label="Remover"
                  >
                    <Icon>delete</Icon>
                  </IconButton>
                </TableCell>
                <TableCell>{cidade.nome}</TableCell>
                <TableCell>{cidade.estado}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </LayoutBaseDePagina>
  );
};
