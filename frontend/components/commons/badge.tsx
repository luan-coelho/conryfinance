import { Calendar } from "lucide-react";

type BadgeProps = {
  children: React.ReactNode;
};

export default function Badge({ children }: BadgeProps) {
  return (
    <>
      <div className="bg-green-100 text-center border border-green-500 text-green-600 text-[13px] font-medium px-2 py-1 rounded-lg flex items-center gap-1">
        <Calendar size={"16px"} />
        <span>{children}</span>
      </div>
    </>
  );
}
