import { Skeleton } from "@/components/ui/skeleton";

export default function MonthlyBudgetsCardSkeleton() {
  return (
    <>
      <Skeleton className="min-w-[500px] min-h-[148px] rounded-lg bg-gray-300" />
      <Skeleton className="min-w-[500px] min-h-[148px] rounded-lg bg-gray-300" />
      <Skeleton className="min-w-[500px] min-h-[148px] rounded-lg bg-gray-300" />
      <Skeleton className="min-w-[500px] min-h-[148px] rounded-lg bg-gray-300" />
    </>
  );
}
