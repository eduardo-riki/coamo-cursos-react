import { Environment } from "../../../environments";
import { Api } from "../axios-config";
import { CidadesServices, IDetalheCidade } from "../cidades/CidadesServices";

export interface IListagemPessoa {
  id: number;
  nomeCompleto: string;
  email: string;
  cidadeId: number;
  cidadeNome: string;
}

export interface IDetalhePessoa {
  id: number;
  nomeCompleto: string;
  email: string;
  cidadeId: number;
  cidadeNome?: string
}

export interface TPessoasComTotalCount {
  data: IListagemPessoa[];
  totalCount: number;
}

const create = async (
  pessoa: Omit<IDetalhePessoa, "id">
): Promise<number | Error> => {
  try {
    const { data } = await Api.post<IDetalhePessoa>("/pessoa", pessoa);
    if (data) {
      return data.id;
    }

    return new Error("Erro ao cadastrar o registro.");
  } catch (error) {
    return new Error(
      (error as { message: string }).message || "Erro ao cadastrar o registro."
    );
  }
};

const getAll = async (
  page = 1,
  filter = ""
): Promise<TPessoasComTotalCount | Error> => {
  try {
    const urlPessoa = `/pessoa/listar?page=${page}&limit=${Environment.LIMITE_DE_LINHAS}&filter=${filter}`;
    const { data, headers } = await Api.get(urlPessoa);

    if (data) {
      const pessoasComCidade = await Promise.all(
        data.map(async (pessoa: IListagemPessoa) => {
          const cidadeResult = await CidadesServices.getById(pessoa.cidadeId);
          if (cidadeResult instanceof Error) {
            throw cidadeResult;
          }
          return {
            ...pessoa,
            cidadeNome: cidadeResult.nome,
          };
        })
      );

      return {
        data: pessoasComCidade,
        totalCount: headers["x-total-count"] || process.env.LIMITE_DE_LINHAS,
      };
    }
    return new Error("Erro ao listar os registros.");
  } catch (error) {
    return new Error(
      (error as { message: string }).message || "Erro ao listar os registros."
    );
  }
};

const getById = async (
  id: number
): Promise<IDetalhePessoa | Error> => {
  try {
    const pessoasData = await Api.get(`/pessoa/${id}`);
    const pessoa: IDetalhePessoa = pessoasData.data;
    if (pessoa) {
      try {
        const cidadeData = await Api.get(`cidade/${pessoa.cidadeId}`);
        const cidade: IDetalheCidade = cidadeData.data;

        if (cidade) {
          return {
            ...pessoa,
            cidadeNome: cidade.nome,
          };
        } else {
          return new Error("Erro ao listar a cidade.");
        }
      } catch (cidadeError) {
        return new Error(
          (cidadeError as { message: string }).message ||
            "Erro ao listar a cidade."
        );
      }
    }

    return new Error("Erro ao listar o registro.");
  } catch (error) {
    return new Error(
      (error as { message: string }).message || "Erro ao listar o registro."
    );
  }
};

const updateById = async (
  id: number,
  pessoa: IDetalhePessoa
): Promise<void | Error> => {
  try {
    await Api.put(`/pessoa/${id}`, pessoa);
  } catch (error) {
    return new Error(
      (error as { message: string }).message || "Erro ao editar o registro."
    );
  }
};

const deleteById = async (id: number): Promise<void | Error> => {
  try {
    await Api.delete(`/pessoa/${id}`);
  } catch (error) {
    return new Error(
      (error as { message: string }).message || "Erro ao remover o registro."
    );
  }
};

export const PessoasServices = {
  create,
  getAll,
  getById,
  updateById,
  deleteById,
};
