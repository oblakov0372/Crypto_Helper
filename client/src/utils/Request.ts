import axios, { AxiosRequestConfig } from "axios";

axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("jwt");
    }
    return Promise.reject(error);
  }
);

type QueryParams = Record<string, any>;
type RequestMethod = "get" | "post" | "put" | "delete";
type RequestOptions = {
  queryParams?: QueryParams;
  method?: RequestMethod;
};
export async function anonymRequest(
  url: string,
  params: RequestOptions = {},
  body?: Record<string, unknown>
) {
  const axiosConfig: AxiosRequestConfig = {
    method: params.method ?? "get",
    url: `https://localhost:7261/api/${url}`,
    params: params.queryParams ?? {},
    data: body,
    headers: {
      "Content-Type": "application/json",
    },
  };

  const response = await axios(axiosConfig);
  return response;
}

export async function authenticatedRequest(
  url: string,
  params: RequestOptions = {},
  body?: Record<string, unknown> | number
) {
  const jwtToken = localStorage.getItem("jwt");
  const axiosConfig: AxiosRequestConfig = {
    method: params.method ?? "get",
    url: `https://localhost:7261/api/${url}`,
    params: params.queryParams ?? {},
    data: body,
    headers: {
      Authorization: `Bearer ${jwtToken}`,
      "Content-Type": "application/json",
    },
  };
  const response = await axios(axiosConfig);

  return response;
}
