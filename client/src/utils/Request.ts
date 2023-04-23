import axios, { AxiosRequestConfig } from "axios";

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
  const jwtToken = localStorage.getItem("jwtToken");
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

  if (response.status === 401) {
    // auto logout if 401 response returned from api
    //logout();
    //location.reload(true);
  }

  return response;
}
