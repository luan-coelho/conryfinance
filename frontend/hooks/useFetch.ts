import useSWR, { SWRResponse } from "swr";
import api from "@/services/api";

function useFetch<Data = any, Error = any>(url: string) {
  const { isLoading, data, error, mutate } = useSWR<Data, Error>(url, async (url) => {
    const response = await api.get(url);
    return response.data;
  });
  return { isLoading, data, error, mutate } as SWRResponse;
}

export { useFetch };