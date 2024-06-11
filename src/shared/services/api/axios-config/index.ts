import axios from "axios";
import { errorInterceptor, responseInterceptor } from "./interceptors";
import { Environment } from "../../../environments";

const Api = axios.create({
  baseURL: Environment.URL_BASE || "http://localhost:3333",
});

Api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("APP_ACCESS_TOKEN") || "";
    if (token) {
      config.headers.Authorization = `bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

Api.interceptors.response.use(
  (response) => responseInterceptor(response),
  (error) => errorInterceptor(error)
);

export { Api };
