import { useEffect, useMemo, useState } from "react";
import { FerramentasDaListagem } from "../../shared/components";
import { LayoutBaseDePagina } from "../../shared/layouts";
import {
  PessoasServices,
  IListagemPessoa,
} from "../../shared/services/api/pessoas/PessoasServices";
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

export const ListagemDePessoa: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const { debounce } = UseDebounce(300, true);
  const navigate = useNavigate();

  const [pessoas, setPessoas] = useState<IListagemPessoa[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const pesquisa = useMemo(() => {
    return searchParams.get("pesquisa") || "";
  }, [searchParams]);

  const pagina = useMemo(() => {
    return Number(searchParams.get("pagina") || "1");
  }, [searchParams]);

  const handleEdit = (id: number) => {
    navigate("/pessoas/detalhe/" + id.toString());
  };

  const handleRemove = (id: number) => {
    if (window.confirm("Deseja realmente remover este registro?")) {
      PessoasServices.deleteById(id).then((result) => {
        if (result instanceof Error) {
          alert(result.message);
        } else {
          alert("Registro apagado com sucesso!");
          setPessoas((oldPessoa) => [
            ...oldPessoa.filter((oldPessoa) => oldPessoa.id !== id),
          ]);
        }
      });
    }
  };

  useEffect(() => {
    setIsLoading(true);

    debounce(() => {
      PessoasServices.getAll(pagina, pesquisa).then((result) => {
        setIsLoading(false);
        if (result instanceof Error) {
          alert(result.message);
        } else {
          setPessoas(result.data);
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
            navigate("/pessoas/detalhe/cadastrar");
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
              <TableCell>Nome Completo</TableCell>
              <TableCell>E-mail</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pessoas.map((pessoa) => (
              <TableRow key={pessoa.id}>
                <TableCell>
                  <IconButton
                    size="small"
                    onClick={() => handleEdit(pessoa.id)}
                    aria-label="Editar"
                  >
                    <Icon fontSize="small"> edit</Icon>
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => handleRemove(pessoa.id)}
                    aria-label="Remover"
                  >
                    <Icon fontSize="small">delete</Icon>
                  </IconButton>
                </TableCell>
                <TableCell>{pessoa.nomeCompleto}</TableCell>
                <TableCell>{pessoa.email}</TableCell>
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
