import { Link } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";

export const Menu: React.FC = () => {
  return (
    <div className="flex justify-between px-10 py-6 shadow-md bg-gray-950">
      <ul className="flex gap-6 text-white font-semibold">
        <li>
          <Link to={"/"}>Home</Link>
        </li>
        <li>
          <Link to={"/parceiros"}>Parceiros</Link>
        </li>
        <li>
          <Link to={"/empresas"}>Empresas</Link>
        </li>
      </ul>

      <Link to={"/"} className="flex text-orange-600 items-center gap-2">
        <FiLogOut />
        <span className="font-medium">Sair</span>
      </Link>
    </div>
  );
};
