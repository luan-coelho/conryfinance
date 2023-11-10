import React from "react";

type EmptyContentProps = {
  children: React.ReactNode;
};

export function EmptyContent({ children }: EmptyContentProps) {
  return <><div className="my-2 font-medium text-zinc-500 text-center p-2 border-2 rounded border-dashed">{children}</div></>;
}
