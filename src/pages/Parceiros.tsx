import Container from "../components/Container";
import { useQuery } from "react-query";
import { Parceiro } from "../types/Parceiro";
import TableParceiros from "../components/TableParceiros";
import { useState } from "react";
import { fetchParceiros } from "../services/parceirosService";
import ModalParceiros from "../components/ModalParceiros";
import Snackbar from "../components/Snackbar";
import { Fab, SnackbarCloseReason } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ConfirmacaoParceiro from "../components/ConfirmacaoParceiro";

const Parceiros = () => {
  const { data, error, isLoading, refetch } = useQuery<Parceiro[]>("fetchParceiros", fetchParceiros, {
    refetchOnWindowFocus: false,
  });

  const [id, setId] = useState<string>();

  const [open, setOpen] = useState(false);
  const [openConfirmation, setOpenConfirmation] = useState(false);

  const [openSnack, setOpenSnack] = useState(false);
  const [messageSnack, setMessageSnack] = useState("");

  const handleSnack = (message: string) => {
    setOpenSnack(true);
    setMessageSnack(message);
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

  const handleClickOpen = (id?: string) => {
    setOpen(true);
    setId(id);
  };

  const handleClose = () => {
    setOpen(false);
    setId(undefined);
  };

  const handleConfirmation = (id?: string) => {
    setOpenConfirmation(true);
    setId(id);
  };

  const handleCloseConfirmation = () => {
    setOpenConfirmation(false);
    setId(undefined);
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <Container>
      <div className="flex flex-col justify-between gap-8">
        <h1 className="font-bold text-3xl">Nossos Parceiros</h1>

        <Fab
          onClick={() => handleClickOpen()}
          className="flex items-center gap-1 self-end bg-blue-300 px-2 py-3 rounded-xl"
          color="primary"
          aria-label="add"
          variant="extended"
        >
          <AddIcon />
          Adicionar Parceiro
        </Fab>
      </div>

      {data && <TableParceiros data={data} handleClickOpen={handleClickOpen} handleConfirmation={handleConfirmation} />}

      <ModalParceiros idEdit={id} isOpen={open} handleClose={handleClose} handleSnack={handleSnack} handleRefetchData={handleRefresh} />
      <ConfirmacaoParceiro
        idDelete={id}
        open={openConfirmation}
        handleClose={handleCloseConfirmation}
        handleRefetchData={handleRefresh}
        handleSnack={handleSnack}
      />
      <Snackbar open={openSnack} message={messageSnack} handleClose={handleCloseSnack} />
    </Container>
  );
};

export default Parceiros;
