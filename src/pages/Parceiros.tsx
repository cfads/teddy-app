import Container from "../components/Container";
import { IoMdAdd } from "react-icons/io";

import { useQuery } from "react-query";
import { fetchParceiros } from "../services/ParceirosService";
import { Parceiro } from "../types/Parceiro";
import TableParceiros from "../components/TableParceiros";

const Parceiros = () => {
  const { data, error, isLoading } = useQuery<Parceiro[]>("fetchParceiros", fetchParceiros);

  if (isLoading) return <p>Loading...</p>;

  return (
    <Container>
      <div className="flex flex-col justify-between gap-16">
        <h1 className="font-bold text-3xl">Parceiros</h1>

        <button className="flex items-center gap-1 self-end bg-blue-300 px-2 py-3 rounded-xl">
          <IoMdAdd /> <span>Novo Parceiro</span>
        </button>
      </div>

      {data && <TableParceiros data={data} />}
    </Container>
  );
};

export default Parceiros;
