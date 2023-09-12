"use client";

import PacmanLoader from "react-spinners/PacmanLoader";

export default function Loading() {
  return (
    <div
      className="fixed inset-0 z-50 backdrop-brightness-90 data-[state=open]:animate-in data-[state=closed]:animate-out
      data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 flex items-center justify-center flex-col gap-4">
      <PacmanLoader color="#3A71EC" />
    </div>
  );
}
