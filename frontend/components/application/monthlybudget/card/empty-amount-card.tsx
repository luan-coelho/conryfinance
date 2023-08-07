import { Card } from "@/components/ui/card";
import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

type EmptyAmountCardProps = ComponentProps<"div"> & {
  description: string;
  amount: number;
};

export default function EmptyAmountCard({ description, amount, className }: EmptyAmountCardProps) {
  function formatToBRL(value: string): string {
    const numberValue = parseFloat(value);

    const formattedValue = numberValue.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

    return formattedValue;
  }

  return (
    <Card
      className={twMerge(
        "bg-white border-1 rounded-xl shadow p-3 min-h-[100px] max-h-[100px] flex flex-col items-center justify-center gap-2",
        className,
      )}>
      <h2 className="text-xl font-bold">{description}</h2>
      <div className="text-4xl font-bold">{amount && formatToBRL(amount.toString())}</div>
    </Card>
  );
}
