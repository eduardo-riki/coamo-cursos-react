import { AxiosError } from "axios";

export const errorInterceptor = (error: AxiosError) => {
  if (error.response) {
    switch (error.response.status) {
      case 400: // Bad Request
        return Promise.reject(
          new Error("Requisição inválida. Verifique os dados enviados.")
        );
      case 401: // Unauthorized
        return Promise.reject(
          new Error("Não autorizado. Por favor, faça login.")
        );
      case 403: // Forbidden
        return Promise.reject(
          new Error(
            "Acesso proibido. Você não tem permissão para acessar este recurso."
          )
        );
      case 404: // Not Found
        return Promise.reject(
          new Error("Recurso não encontrado. Verifique o URL.")
        );
      case 500: // Internal Server Error
        return Promise.reject(
          new Error("Erro interno do servidor. Tente novamente mais tarde.")
        );
      case 502: // Bad Gateway
        return Promise.reject(
          new Error(
            "Erro de gateway. O servidor recebeu uma resposta inválida."
          )
        );
      case 503: // Service Unavailable
        return Promise.reject(
          new Error("Serviço indisponível. Tente novamente mais tarde.")
        );
      case 504: // Gateway Timeout
        return Promise.reject(
          new Error(
            "Tempo de resposta do gateway excedido. Tente novamente mais tarde."
          )
        );
      default: // Unexpected Error
        return Promise.reject(
          new Error(`Erro inesperado: ${error.response.statusText}`)
        );
    }
  } else if (error.request) { // No response received
    return Promise.reject(
      new Error("Erro na solicitação. Nenhuma resposta recebida do servidor.")
    );
  } else { // Request configuration error
    return Promise.reject(
      new Error(`Erro ao configurar a solicitação: ${error.message}`)
    );
  }
};
