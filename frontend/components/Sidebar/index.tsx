export default function Sidebar() {
  return (
    <aside className="bg-black text-white w-[300px] h-[400px] flex p-4 flex-col rounded-2xl">
      <div className="flex gap-3 py-3">
        <div className="bg-white text-black rounded w-12 h-12 flex items-center justify-center">
          <span className="font-bold text-xl">CF</span>
        </div>
        <div>
          <h1 className="font-bold uppercase">Confy Finance</h1>
          <h2 className="text-sm text-gray-300">Finanças pessoais</h2>
        </div>
      </div>

      <div className="w-full">
        <hr className="h-px bg-gray-500 border-0" />
      </div>

      <div className="py-3">
        <span className="text-sm text-gray-300 font-bold">FINANCES</span>
        <ul className="my-2">
          <li className="bg-white text-black px-2 py-1 rounded">
            Orçamentos mensais
          </li>
        </ul>
      </div>
    </aside>
  );
}
