import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

const API_BASE_URL = process.env.API_BASE_URL;

const xhttpClient = axios.create({
  baseURL: API_BASE_URL,
});

async function requestInterceptor(config: InternalAxiosRequestConfig) {
  config.headers["Content-Type"] = "application/json";
  config.headers["accept"] = "*/*";
  return config;
}

async function responseInterceptor(value: AxiosResponse<any, any>) {
  return value;
}

async function responseErrorInterceptor({ status, code, ...err }: AxiosError) {
  const isNotWorkError = code == "ERR_NETWORK"; // ERR_CONNECTION_REFUSED
  if (isNotWorkError) {
    try {
      //
      // window.location.pathname = "/error"
    } catch {
      /** in case called from server ignore client side function*/
    }
  }
  return Promise.reject({ ...err, status, code });
}

xhttpClient.interceptors.request.use(requestInterceptor);
xhttpClient.interceptors.response.use(responseInterceptor, responseErrorInterceptor);
export default xhttpClient;
