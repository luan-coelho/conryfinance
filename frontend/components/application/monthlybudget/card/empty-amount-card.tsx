import { Card } from "@/components/ui/card";
import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

type EmptyAmountCardProps = ComponentProps<"div"> & {
  description: string;
  amount: string;
};

export default function EmptyAmountCard({ description, amount, className }: EmptyAmountCardProps) {
  return (
    <Card
      className={twMerge(
        "bg-white border-1 rounded-xl shadow p-3 w-[200px] min-h-[100px] max-h-[100px] flex flex-col items-center justify-center gap-2",
        className,
      )}>
      <h2 className="text-xl font-bold">{description}</h2>
      <div className="text-4xl font-bold">R${amount}</div>
    </Card>
  );
}
