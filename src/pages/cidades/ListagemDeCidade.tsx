import { useEffect, useMemo, useState } from "react";
import { FerramentasDaListagem } from "../../shared/components";
import { LayoutBaseDePagina } from "../../shared/layouts";
import {
  CidadesServices,
  IListagemCidade,
} from "../../shared/services/api/cidades/CidadesService";
import { useNavigate, useSearchParams } from "react-router-dom";
import { UseDebounce } from "../../shared/hooks/UseDebounce";
import {
  Icon,
  IconButton,
  LinearProgress,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
} from "@mui/material";
import { Environment } from "../../shared/environments";

export const ListagemDeCidade: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const { debounce } = UseDebounce(300, true);
  const navigate = useNavigate();

  const [cidades, setCidades] = useState<IListagemCidade[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const pesquisa = useMemo(() => {
    return searchParams.get("pesquisa") || "";
  }, [searchParams]);

  const pagina = useMemo(() => {
    return Number(searchParams.get("pagina") || "1");
  }, [searchParams]);

  const handleEdit = (id: number) => {
    navigate("/cidades/detalhe/" + id.toString());
  };

  const handleRemove = (id: number) => {
    if (window.confirm("Deseja realmente remover este registro?")) {
      CidadesServices.deleteById(id).then((result) => {
        if (result instanceof Error) {
          alert(result.message);
        } else {
          alert("Registro apagado com sucesso!");
          setCidades((oldCidade) => [
            ...oldCidade.filter((oldCidade) => oldCidade.id !== id),
          ]);
        }
      });
    }
  };

  useEffect(() => {
    setIsLoading(true);

    debounce(() => {
      CidadesServices.getAll(pagina, pesquisa).then((result) => {
        setIsLoading(false);
        if (result instanceof Error) {
          alert(result.message);
        } else {
          setCidades(result.data);
          setTotalCount(Number(result.totalCount));
        }
      });
    });
  }, [debounce, pagina, pesquisa]);

  return (
    <LayoutBaseDePagina
      barraDeFerramentas={
        <FerramentasDaListagem
          mostrarCampoDeBusca
          textoDaBusca={pesquisa}
          aoClicarEmNovo={() => {
            navigate("/cidades/detalhe/cadastrar");
          }}
          aoMudarTextoDaBusca={(texto) =>
            setSearchParams({ pesquisa: texto, pagina: "1" }, { replace: true })
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
                    size="small"
                    onClick={() => handleEdit(cidade.id)}
                    aria-label="Editar"
                  >
                    <Icon fontSize="small"> edit</Icon>
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => handleRemove(cidade.id)}
                    aria-label="Remover"
                  >
                    <Icon fontSize="small">delete</Icon>
                  </IconButton>
                </TableCell>
                <TableCell>{cidade.nome}</TableCell>
                <TableCell>{cidade.estado}</TableCell>
              </TableRow>
            ))}
          </TableBody>

          <TableFooter>
            {totalCount > 0 && totalCount > Environment.LIMITE_DE_LINHAS ? (
              <TableRow>
                <TableCell colSpan={3} sx={{ justifyContent: "center" }}>
                  <Pagination
                    shape="rounded"
                    page={pagina}
                    count={Math.ceil(totalCount / Environment.LIMITE_DE_LINHAS)}
                    onChange={(_, newPage) => {
                      setSearchParams(
                        { pesquisa, pagina: newPage.toString() },
                        { replace: true }
                      );
                    }}
                  />
                </TableCell>
              </TableRow>
            ) : null}

            {isLoading ? (
              <TableRow>
                <TableCell colSpan={3}>
                  <LinearProgress variant="indeterminate" />
                </TableCell>
              </TableRow>
            ) : totalCount === 0 ? (
              <TableRow>
                <TableCell colSpan={3}>Nenhum registro encontrado.</TableCell>
              </TableRow>
            ) : null}
          </TableFooter>
        </Table>
      </TableContainer>
    </LayoutBaseDePagina>
  );
};
