"use client";

import { Calendar } from "lucide-react";
import React from "react";
import { twMerge } from "tailwind-merge";

type BadgeProps = {
  children: React.ReactNode;
  period?: Date
};

export function getBadgeStyleByPeriod(period: Date): string {
  const month = new Date(period).getMonth();
  let color;

  if (month === 0) {
    color = "blue";
  } else if (month === 1) {
    color = "pink";
  } else if (month === 2) {
    color = "green";
  } else if (month === 3) {
    color = "purple";
  } else if (month === 4) {
    color = "yellow";
  } else if (month === 5) {
    color = "indigo";
  } else if (month === 6) {
    color = "red";
  } else if (month === 7) {
    color = "teal";
  } else if (month === 8) {
    color = "orange";
  } else if (month === 9) {
    color = "gray";
  } else if (month === 10) {
    color = "cyan";
  } else if (month === 11) {
    color = "pink";
  } else {
    color = "black";
  }
  return `bg-${color}-100 border-${color}-500 text-${color}-600`;
}

export default function Badge({ children, period }: BadgeProps) {
  const style = getBadgeStyleByPeriod(period!);
  return (
    <>
      <div
        className={twMerge(`border text-center text-[13px] font-medium rounded-lg flex items-center gap-1 h-8 px-2 py-2`, style)}>
        <Calendar size={16} />
        <span>{children}</span>
      </div>
    </>
  );
}
