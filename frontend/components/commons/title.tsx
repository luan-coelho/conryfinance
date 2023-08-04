export default function Title({ children }: { children: React.ReactNode }) {
  return (
    <div className="py-4">
      <h1 className="text-2xl font-medium">{children}</h1>
    </div>
  );
}
