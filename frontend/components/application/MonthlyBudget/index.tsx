import { Card } from "@/components/ui/card";
import { MonthlyBudget } from "@/types";
import { getMonthNameFromDate } from "@/utils/dateutils";
import Link from "next/link";

interface MonthlyBudgetCardProps {
  monthlyBudget: MonthlyBudget;
}

export default function MonthlyBudgetCard({ monthlyBudget }: MonthlyBudgetCardProps) {
  return (
    <Card className="bg-white border-1 rounded-xl shadow min-w-[300px] p-3 flex justify-between">
      <div>
        <h2 className="text-base font-bold">{monthlyBudget.description}</h2>
        <span className=" bg-green-600 text-white font-semibold text-xs py-1 px-2 rounded border">
          {getMonthNameFromDate(monthlyBudget.period)}
        </span>
      </div>
      <div className="min-w-7 rounded border p-2">
        <Link href={`/monthlybudgets/${monthlyBudget.id}`}>
          <span>V</span>
        </Link>
      </div>
    </Card>
  );
}
