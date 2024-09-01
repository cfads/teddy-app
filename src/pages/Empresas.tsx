import { Fab, SnackbarCloseReason } from "@mui/material";
import Container from "../components/Shared/Container";
import AddIcon from "@mui/icons-material/Add";
import TableEmpresas from "../components/Empresas/TableEmpresas";
import { useQuery } from "react-query";
import { Empresa } from "../types/Empresa";
import { fetchEmpresas } from "../services/empresasService";
import ModalEmpresas from "../components/Empresas/ModalEmpresas";
import { useState } from "react";
import Snackbar from "../components/Shared/Snackbar";
import ConfirmacaoEmpresa from "../components/Empresas/ConfirmacaoEmpresa";

const Empresas = () => {
  const { data, error, isLoading, refetch } = useQuery<Empresa[]>("fetchEmpresas", fetchEmpresas, {
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

  return (
    <Container>
      <div className="flex flex-col justify-between gap-8">
        <h1 className="font-bold text-3xl">Empresas Externas</h1>

        <Fab
          onClick={() => handleClickOpen()}
          className="flex items-center gap-1 self-end bg-blue-300 px-2 py-3 rounded-xl"
          color="primary"
          aria-label="add"
          variant="extended"
        >
          <AddIcon />
          Adicionar Empresa
        </Fab>
      </div>

      {data && <TableEmpresas data={data} handleClickOpen={handleClickOpen} handleConfirmation={handleConfirmation} />}

      <ModalEmpresas idEdit={id} isOpen={open} handleClose={handleClose} handleSnack={handleSnack} handleRefetchData={handleRefresh} />

      <ConfirmacaoEmpresa
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

export default Empresas;
