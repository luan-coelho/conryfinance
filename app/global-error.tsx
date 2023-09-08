"use client";

export default function GlobalError({ error }: { error: Error }) {
  return (
    <>
      <div>
        <h2>{error.message}</h2>
      </div>
    </>
  );
}