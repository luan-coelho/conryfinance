import { MonthlyBudget, ResponseData } from "@/types";

export async function getAllMonthlyBudgets(url: string): Promise<ResponseData<MonthlyBudget>> {
  const res = await fetch(url);
  return await res.json();
}
