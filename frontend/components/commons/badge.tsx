"use client";

import { Calendar } from "lucide-react";
import React from "react";

type BadgeProps = {
  children: React.ReactNode;
  period?: Date
};

export default function Badge({ children, period }: BadgeProps) {
  const month = new Date(period!).getMonth();

  const monthToColorMap = {
    0: "bg-blue-100 border-blue-500 text-blue-600",
    1: "bg-pink-100 border-pink-500 text-pink-600",
    2: "bg-green-100 border-green-500 text-green-600",
    3: "bg-purple-100 border-purple-500 text-purple-600",
    4: "bg-yellow-100 border-yellow-500 text-yellow-600",
    5: "bg-indigo-100 border-indigo-500 text-indigo-600",
    6: "bg-red-100 border-red-500 text-red-600",
    7: "bg-teal-100 border-teal-500 text-teal-600",
    8: "bg-orange-100 border-orange-500 text-orange-600",
    9: "bg-gray-100 border-gray-500 text-gray-600",
    10: "bg-cyan-100 border-cyan-500 text-cyan-600",
    11: "bg-pink-100 border-pink-500 text-pink-600",
  };
  // @ts-ignore
  const color = monthToColorMap[month] || "bg-blue-100 border-blue-500 text-blue-600";

  return (
    <>
      <div
        className={`border text-center text-[13px] font-medium rounded-lg flex items-center gap-1 h-8 px-2 py-2 ${color}`}>
        <Calendar size={16} />
        <span>{children}</span>
      </div>
    </>
  );
}
