import { MonthlyBudget, ResponseData } from "@/types";
import { HTTP_METHOD, useFetch } from "@/hooks/useFetch";
import { routes } from "@/routes";
import { SWRResponse } from "swr";

export function useFetchAllMonthlyBudgets(): SWRResponse {
  return useFetch<ResponseData<MonthlyBudget>>(routes.monthlyBudget.root, HTTP_METHOD.GET);
}

export function useFetchMonthlyBudgetById(monthlyBudgetId: string): SWRResponse {
  let url = `${routes.monthlyBudget.root}/${monthlyBudgetId}`;
  console.log(url);
  return useFetch<MonthlyBudget>(url, HTTP_METHOD.GET);
}
