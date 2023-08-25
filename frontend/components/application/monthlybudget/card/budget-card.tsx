"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { routes } from "@/routes";
import { MonthlyBudget } from "@/types";
import { toastError } from "@/utils/toast";
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
    const response = await fetch(`${routes.monthlyBudget.updateBudget}/${monthlyBudget.id}`, {
      method: "POST",
      cache: "no-cache",
      headers: { "Content-Type": "application/json" },
      mode: "cors",
      body: JSON.stringify({ newBudget: formatToGlobalNumber(amount!) }),
    });

    if (!response.ok) {
      toastError("Failed to fetch data");
    }

    setEditBudget(false);
    await mutate(`routes.monthlyBudget.root}/${monthlyBudget.id}`);
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
        "flex flex-col items-center justify-center gap-2 bg-white border-1 rounded-xl shadow p-3 min-h-[100px] max-h-[100px]",
        className,
      )}>
      <h2 className="text-xl text-center font-bold">{description}</h2>
      {editBudget ? (
        <div className="flex border rounded-md w-full">
          <Input
            id="item-amount"
            placeholder="Valor"
            className="square-input placeholder:text-gray-500"
            value={amount}
            onChange={handleAmountChange}
          />
          <Button
            onClick={fetchUpdateCardAmount}
            className="px-2 bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
            <Check />
          </Button>
          <Button
            onClick={() => setEditBudget(false)}
            className="px-2 bg-red-500 text-white hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50">
            <X />
          </Button>
        </div>
      ) : (
        <div onDoubleClick={() => setEditBudget(true)} className="text-4xl font-bold">
          R${monthlyBudget.budget}
        </div>
      )}
    </Card>
  );
}
