import { Api } from "../axios-config";

interface IAuth {
  accessToken: string;
}

const auth = async (
  email: string,
  senha: string
): Promise<IAuth | Error> => {
  try {
    const { data } = await Api.post("/usuario/signIn", { email, senha });
    if (data) {
      return data;
    }

    return new Error("Erro no login.");
  } catch (error) {
    return new Error(
      (error as { message: string }).message || "Erro no login."
    );
  }
};

export const AuthService = {
  auth,
};
