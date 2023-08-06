export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-brightness-150 /*backdrop-brightness-75*/ data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0">
      Carregando...
    </div>
  );
}
