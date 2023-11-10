"use client";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { routes } from "@/routes";
import { MonthlyBudget } from "@/types";
import { Check, X } from "lucide-react";
import { ComponentProps, useState } from "react";
import { twMerge } from "tailwind-merge";
import { mutate } from "swr";

type BudgetCardProps = ComponentProps<"div"> & {
  description: string;
  monthlyBudget: MonthlyBudget;
};

export default function BudgetCard({ description, monthlyBudget, className }: BudgetCardProps) {
  const [amount, setAmount] = useState<string>();
  const [editBudget, setEditBudget] = useState<boolean>(false);

  function formatToGlobalNumber(value: string): string {
    const withoutThousandSeparator = value.replace(/\./g, "");
    return withoutThousandSeparator.replace(",", ".");
  }

  async function fetchUpdateCardAmount() {
    await fetch(`${routes.monthlyBudget.updateBudget}/${monthlyBudget.id}`, {
      method: "POST",
      cache: "no-cache",
      headers: { "Content-Type": "application/json" },
      mode: "cors",
      body: JSON.stringify({ newBudget: formatToGlobalNumber(amount!) }),
    });

    setEditBudget(false);
    await mutate(`${routes.monthlyBudget.root}/${monthlyBudget.id}`);
  }

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    const numericValue = value.replace(/[^0-9]/g, "");

    if (numericValue) {
      const numberValue = parseFloat(numericValue) / 100;

      const formattedValue = numberValue.toLocaleString("pt-BR", { style: "decimal", minimumFractionDigits: 2 });

      setAmount(formattedValue);
    } else {
      setAmount("");
    }
  };

  return (
    <Card
      className={twMerge(
        "min-w-[200px] min-h-[100px] max-h-[100px] flex flex-col items-center justify-center gap-2 bg-white border-2 rounded-xl shadow p-3",
        className,
      )}>
      <h2 className="text-xl text-center font-bold">{description}</h2>
      {editBudget ? (
        <div className="relative flex rounded-lg border-2 border-blue-500 w-full items-center">
          <Input
            id="item-amount"
            placeholder="Valor"
            className="input text-black rounded-lg"
            value={amount}
            onChange={handleAmountChange}
          />
          <div
            className="absolute text-black flex items-center justify-center gap-2 right-1 border border-zinc-500 bg-zinc-200 rounded-2xl py-1 px-2 cursor-pointer">
            <Check className="hover:bg-zinc-300 rounded-full" onClick={fetchUpdateCardAmount} />
            <X className="hover:bg-zinc-300 rounded-full" onClick={() => setEditBudget(false)} />
          </div>
        </div>
      ) : (
        <div onDoubleClick={() => setEditBudget(true)} className="text-4xl font-bold">
          R${monthlyBudget.budget}
        </div>
      )}
    </Card>
  );
}
