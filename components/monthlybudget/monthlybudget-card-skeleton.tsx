import { Skeleton } from "@/components/ui/skeleton";

export default function MonthlyBudgetsCardSkeleton() {
  return (
    <>
      <Skeleton className="w-[460px] h-[150px] rounded-lg bg-gray-300" />
      <Skeleton className="w-[460px] h-[150px] rounded-lg bg-gray-300" />
      <Skeleton className="w-[460px] h-[150px] rounded-lg bg-gray-300" />
      <Skeleton className="w-[460px] h-[150px] rounded-lg bg-gray-300" />
    </>
  );
}
