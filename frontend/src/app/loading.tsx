export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-50 bg-black">
      <div className="animate-pulse bg-blue-500 w-16 h-16 rounded-full">
        Carregando
      </div>
    </div>
  );
}
