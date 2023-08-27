import { AlertCircle } from "lucide-react";
import React from "react";

type MessageRootProps = {
  value: string
}

export function MessageRoot({ value }: MessageRootProps) {
  return <>
    <div>
      {value &&
        <div className="bg-red-500 flex items-center justify-center gap-3 text-sm font-medium text-white rounded px-4 py-3 text-justify">
          <AlertCircle size={30} />
          <span>{value}</span>
        </div>
      }
    </div>
  </>;
}