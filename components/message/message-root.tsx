import { AlertCircle } from "lucide-react";
import React from "react";

type MessageRootProps = {
  value: string
}

export function MessageRoot({ value }: MessageRootProps) {
  return <>
    <div>
      {value &&
        <div
          className="bg-red-500 text-base font-medium text-white rounded-xl px-4 py-3 text-justify flex gap-2">
          <div className="flex items-start justify-start">
            <AlertCircle size={30} />
          </div>
          <div className="flex items-start justify-start">
            <span>{value}</span>
          </div>
        </div>
      }
    </div>
  </>;
}