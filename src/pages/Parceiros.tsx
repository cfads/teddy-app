import Container from "../components/Container";
import { IoMdAdd } from "react-icons/io";
import { useQuery } from "react-query";
import { Parceiro } from "../types/Parceiro";
import TableParceiros from "../components/TableParceiros";
import { useState } from "react";
import { fetchParceiros } from "../services/parceirosService";
import ModalParceiros from "../components/ModalParceiros";
import Snackbar from "../components/Snackbar";
import { SnackbarCloseReason } from "@mui/material";

const Parceiros = () => {
  const { data, error, isLoading, refetch } = useQuery<Parceiro[]>("fetchParceiros", fetchParceiros, {
    refetchOnWindowFocus: false,
  });

  const [open, setOpen] = useState(false);
  const [openSnack, setOpenSnack] = useState(false);

  const handleSnack = () => {
    setOpenSnack(true);
  };

  const handleCloseSnack = (event?: React.SyntheticEvent | Event, reason?: SnackbarCloseReason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnack(false);
  };

  const handleRefresh = () => {
    refetch();
  };

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
          <IoMdAdd /> <span>Novo Parceiro {data?.length}</span>
        </button>
      </div>

      {data && <TableParceiros data={data} />}

      <ModalParceiros isOpen={open} handleClose={handleClose} handleSnack={handleSnack} handleRefetchData={handleRefresh} />
      <Snackbar open={openSnack} message="Parceiro cadastrado com sucesso!" handleClose={handleCloseSnack} />
    </Container>
  );
};

export default Parceiros;
