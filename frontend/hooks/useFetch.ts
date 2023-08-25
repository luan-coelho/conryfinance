import useSWR, { SWRResponse } from "swr";
import api from "@/services/api";

export enum HTTP_METHOD {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  PATCH = "PATCH",
  DELETE = "DELETE",
  HEAD = "HEAD",
  OPTIONS = "OPTIONS",
}

function useFetch<Data = any, Error = any>(url: string, method: string) {
  const { isLoading, data, error, mutate } = useSWR<Data, Error>(url, async (url) => {
    const response = await api({
      method: method,
      url: url,
    });
    return response.data;
  });
  return { isLoading, data, error, mutate } as SWRResponse;
}

export { useFetch };