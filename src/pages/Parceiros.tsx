import Container from "../components/Container";
import { IoMdAdd } from "react-icons/io";

import { useQuery } from "react-query";
import { fetchParceiros } from "../services/ParceirosService";
import { Parceiro } from "../types/Parceiro";
import TableParceiros from "../components/TableParceiros";

import { useState } from "react";
import Modal from "../components/Dialog";

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

      <Modal isOpen={open} handleClose={handleClose} title="Cadastro de parceiro">
        <p>teste</p>
      </Modal>
    </Container>
  );
};

export default Parceiros;
