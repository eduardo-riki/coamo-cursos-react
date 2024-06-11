import { Api } from "../axios-config";

export interface IDetalheUsuario {
  id: number;
  nome: string;
  email: string;
  senha: string;
}

const create = async (
  usuario: Omit<IDetalheUsuario, "id">
): Promise<number | Error> => {
  try {
    const { data } = await Api.post<IDetalheUsuario>(
      "/usuario/signUp",
      usuario
    );
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

export const UsuarioServices = {
  create,
};
