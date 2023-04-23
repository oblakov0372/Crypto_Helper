import axios, { AxiosRequestConfig } from "axios";

type QueryParams = Record<string, any>;
type RequestMethod = "get" | "post" | "put" | "delete";
type RequestOptions = {
  queryParams?: QueryParams;
  method?: RequestMethod;
};

export async function anonimRequest<T>(
  url: string,
  params: RequestOptions = {}
): Promise<T> {
  const axiosConfig: AxiosRequestConfig = {
    method: params.method ?? "get",
    url: `https://localhost:7261/api/${url}`,
    params: params.queryParams ?? {},
  };

  const response = await axios(axiosConfig);
  return response.data;
}
