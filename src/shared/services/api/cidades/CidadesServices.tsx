import { Environment } from "../../../environments";
import { Api } from "../axios-config";

export interface IListagemCidade {
  id: number;
  nome: string;
  estado: string;
}

export interface IDetalheCidade {
  id: number;
  nome: string;
  estado: string;
}

export interface TCidadesComTotalCount {
  data: IListagemCidade[];
  totalCount: number;
}

const create = async (
  cidade: Omit<IDetalheCidade, "id">
): Promise<number | Error> => {
  try {
    const { data } = await Api.post<IDetalheCidade>("/cidade", cidade);
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
): Promise<TCidadesComTotalCount | Error> => {
  try {
    const url = `/cidade/listar?page=${page}&limit=${Environment.LIMITE_DE_LINHAS}&filter=${filter}`;
    const { data, headers } = await Api.get(url);

    if (data) {
      return {
        data,
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

const getById = async (id: number): Promise<IDetalheCidade | Error> => {
  try {
    const { data } = await Api.get(`/cidade/${id}`);
    if (data) {
      return data;
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
  cidade: IDetalheCidade
): Promise<void | Error> => {
  try {
    await Api.put(`/cidade/${id}`, cidade);
  } catch (error) {
    return new Error(
      (error as { message: string }).message || "Erro ao editar o registro."
    );
  }
};

const deleteById = async (id: number): Promise<void | Error> => {
  try {
    await Api.delete(`/cidade/${id}`);
  } catch (error) {
    return new Error(
      (error as { message: string }).message || "Erro ao remover o registro."
    );
  }
};

export const CidadesServices = {
  create,
  getAll,
  getById,
  updateById,
  deleteById,
};
