import { Calendar } from "lucide-react";

type BadgeProps = {
  children: React.ReactNode;
};

export default function Badge({ children }: BadgeProps) {
  return (
    <div className="w-14 h-6 text-center text-green-600 text-xs font-medium leading-tight justify-start items-start inline-flex">
      <div className="px-1.5 py-0.5 bg-green-100 rounded-md justify-start items-center gap-1 flex">
        <Calendar className="w-3 h-3" />
        <div>{children}</div>
      </div>
    </div>
  );
}
