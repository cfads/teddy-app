import { Fab } from "@mui/material";
import Container from "../components/Shared/Container";
import AddIcon from "@mui/icons-material/Add";
import TableEmpresas from "../components/Empresas/TableEmpresas";
import { useQuery } from "react-query";
import { Empresa } from "../types/Empresa";
import { fetchEmpresas } from "../services/empresasService";

const Empresas = () => {
  const { data, error, isLoading, refetch } = useQuery<Empresa[]>("fetchEmpresas", fetchEmpresas, {
    refetchOnWindowFocus: false,
  });

  const handleClickOpen = () => {};

  const handleConfirmation = () => {};
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

      {/* <ModalParceiros idEdit={id} isOpen={open} handleClose={handleClose} handleSnack={handleSnack} handleRefetchData={handleRefresh} />
      <ConfirmacaoParceiro
        idDelete={id}
        open={openConfirmation}
        handleClose={handleCloseConfirmation}
        handleRefetchData={handleRefresh}
        handleSnack={handleSnack}
      />
      <Snackbar open={openSnack} message={messageSnack} handleClose={handleCloseSnack} /> */}
    </Container>
  );
};

export default Empresas;
