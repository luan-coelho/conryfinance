type NoDataProps = {
  children: React.ReactNode;
};

export function NoData({ children }: NoDataProps) {
  return <span className="my-2 font-medium text-center p-2 border-2 rounded border-dashed">{children}</span>;
}
