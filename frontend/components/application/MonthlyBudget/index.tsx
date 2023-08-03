import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { routes } from "@/routes";
import { MonthlyBudget } from "@/types";
import { getMonthNameFromDate } from "@/utils/dateutils";
import { toastError, toastSuccess } from "@/utils/toast";
import Link from "next/link";

interface MonthlyBudgetCardProps {
  monthlyBudget: MonthlyBudget;
  setMonthlyBudgets: Function;
}

export default function MonthlyBudgetCard({ monthlyBudget, setMonthlyBudgets }: MonthlyBudgetCardProps) {
  async function handleDeleteById() {
    const response = await fetch(`${routes.monthlyBudget.root}/${monthlyBudget.id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      mode: "cors",
    });

    if (!response.ok) {
      const json = await response.json();
      toastError(json.detail);
      return;
    }
    toastSuccess("Orçamento mensal criado com sucesso!");
    setMonthlyBudgets();
  }

  return (
    <>
      <Card className="w-full border-1 border-t-4 border-green-600 bg-white rounded-xl shadow p-3 flex justify-between">
        <div>
          <h2 className="text-base font-bold">{monthlyBudget.description}</h2>
          <span className="bg-green-600 text-white font-semibold text-xs py-1 px-2 rounded border">
            {getMonthNameFromDate(monthlyBudget.period)}
          </span>
        </div>
        <div className="min-w-7 rounded border p-2 flex flex-col items-center gap-2">
          <Link href={`/monthlybudgets/${monthlyBudget.id}`}>
            <Button className="bg-blue-600 hover:bg-green-500 text-white rounded">V</Button>
          </Link>

          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-green-600 hover:bg-green-500 text-white rounded px-2 py-0 w-full">X</Button>
            </DialogTrigger>
            <DialogContent className="max-w-[425px] border border-gray-300 bg-white">
              <DialogHeader>
                <DialogTitle>Cadastrar</DialogTitle>
                <DialogDescription>
                  Crie um novo orçamento mensal, seja pessoal, sua empresa, uma viagem...
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button
                  className="bg-blue-600 hover:bg-green-500 text-white rounded"
                  type="submit"
                  onClick={handleDeleteById}>
                  Confirmar
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </Card>
    </>
  );
}
