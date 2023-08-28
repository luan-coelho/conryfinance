import React from "react";

export default function Title({ children = "Conry Finance" }: { children: React.ReactNode }) {
  return (<>
      <div>
        <title>{children}</title>
        <div className="text-zinc-900 text-3xl font-medium leading-[48px]">{children}</div>
      </div>
    </>
  );
}
