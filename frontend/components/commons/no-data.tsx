type NoDataProps = {
  text: string;
};

export function NoData({ text }: NoDataProps) {
  return <span className="my-2 font-medium text-center p-2 border-2 rounded border-dashed">{text}</span>;
}
