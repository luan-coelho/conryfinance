"use client";

import Image from "next/image";
import Warning from "@/public/images/Warning.svg";

export default function Error({ error }: { error: Error }) {
  return (
    <>
      <div className="flex items-center justify-center flex-col gap-10">
        <Image src={Warning} width={400} height={400} alt="Warning" />
        <span className="font-medium text-xl">{error.message}</span>
      </div>
    </>
  );
}