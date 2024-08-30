import Container from "../components/Container";
import { IoMdAdd } from "react-icons/io";

import { useQuery } from "react-query";
import { Parceiro } from "../types/Parceiro";
import TableParceiros from "../components/TableParceiros";

import { useRef, useState } from "react";
import { fetchParceiros } from "../services/parceirosService";
import ModalParceiros from "../components/ModalParceiros";

const Parceiros = () => {
  const { data, error, isLoading } = useQuery<Parceiro[]>("fetchParceiros", fetchParceiros);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <Container>
      <div className="flex flex-col justify-between gap-16">
        <h1 className="font-bold text-3xl">Parceiros</h1>

        <button onClick={handleClickOpen} className="flex items-center gap-1 self-end bg-blue-300 px-2 py-3 rounded-xl">
          <IoMdAdd /> <span>Novo Parceiro</span>
        </button>
      </div>

      {data && <TableParceiros data={data} />}

      <ModalParceiros isOpen={open} handleClose={handleClose} />
    </Container>
  );
};

export default Parceiros;
