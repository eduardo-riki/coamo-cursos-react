import axios from "axios";
import { errorInterceptor, responseInterceptor } from "./interceptors";
import { Environment } from "../../../environments";

const Api = axios.create({
  baseURL: Environment.URL_BASE,
  headers: {
    Authorization: `bearer ${localStorage.getItem("APP_ACCESS_TOKEN") || ""}`,
  },
});

Api.interceptors.response.use(
  (response) => responseInterceptor(response),
  (error) => errorInterceptor(error)
);

export { Api };
