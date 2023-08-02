import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPiggyBank, faUser } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

export default function Sidebar() {
  return (
    <aside className="bg-[#101727] text-white w-[300px] flex p-4 flex-col rounded-2xl gap-2">
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

      <div>
        <span className="text-xs text-gray-300 font-medium">FINANCES</span>
        <ul className="my-1">
          <li className="bg-white text-gray-800 px-4 py-1 rounded">
            <Link href={'/monthlybudgets'}>
              <div className="flex items-center gap-2">
                <FontAwesomeIcon icon={faPiggyBank} size="1x" />
                <span>Orçamentos mensais</span>
              </div>
            </Link>
          </li>
        </ul>
      </div>

      <div>
        <span className="text-xs text-gray-300 font-medium">USER</span>
        <div className="bg-gray-100 text-gray-800 flex items-center gap-2 px-4 py-1 rounded">
          <FontAwesomeIcon icon={faUser} size="1x" />
          <div className="flex flex-col">
            <span className="text-xs font-bold">LUAN COÊLHO</span>
            <span className="text-xs">Desenvolvedor de Software</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
