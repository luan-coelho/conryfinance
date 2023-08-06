interface NoDataProps {
  text: string;
}

export function NoData({ text }: NoDataProps) {
  return (
    <span className="min-w-full text-center text-violet-600 p-2 border rounded border-violet-600 border-dashed">
      {text}
    </span>
  );
}
