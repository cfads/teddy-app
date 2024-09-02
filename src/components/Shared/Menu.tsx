import { Link } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";

export const Menu: React.FC = () => {
  return (
    <div className="flex justify-between px-10 py-6 shadow-lg bg-orange-700">
      <ul className="flex gap-6 text-white font-semibold">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/parceiros?page=0&size=5">Parceiros</Link>
        </li>
        <li>
          <Link to="/empresas?page=0&size=5">Empresas</Link>
        </li>
      </ul>

      <Link to="https://github.com/cfads/teddy-login" className="flex text-white items-center gap-2">
        <FiLogOut />
        <span className="font-medium">Sair</span>
      </Link>
    </div>
  );
};
