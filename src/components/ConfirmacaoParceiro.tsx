import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, useMediaQuery } from "@mui/material";
import { useMutation, useQuery } from "react-query";
import { Parceiro } from "../types/Parceiro";
import { deleteParceiro } from "../services/parceirosService";

type ConfirmacaoParceiro = {
  open: boolean;
  handleClose: () => void;
  idDelete: string | undefined;
  handleSnack: (message: string) => void;
  handleRefetchData: () => void;
};

const ConfirmacaoParceiro: React.FC<ConfirmacaoParceiro> = ({ open, idDelete, handleClose, handleSnack, handleRefetchData }) => {
  const {
    data: parceiro,
    error,
    isLoading,
  } = useQuery<Parceiro>(["parceiro", idDelete], () => deleteParceiro(idDelete!), {
    enabled: !!idDelete,
  });

  const deleteMutation = useMutation((id: string) => deleteParceiro(id), {
    onSuccess: () => {
      handleSnack("Parceiro removido com sucesso!");
      handleRefetchData();
      handleClose();
    },
    onError: (error) => {
      console.error("Erro ao deletar parceiro", error);
    },
  });

  const handleSubmit = () => {
    if (!idDelete) return;
    deleteMutation.mutate(idDelete);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
      PaperProps={{
        style: {
          minWidth: "30%",
          padding: "20px",
        },
      }}
    >
      {!parceiro ? (
        <CircularProgress className="m-auto" />
      ) : (
        <>
          <DialogTitle id="responsive-dialog-title">
            Tem certeza que deseja remover <strong>{parceiro?.name}</strong> ?
          </DialogTitle>

          <DialogActions>
            <Button autoFocus onClick={handleClose} variant="outlined">
              Cancelar
            </Button>
            <Button onClick={handleSubmit} autoFocus variant="contained" color="error">
              Remover
            </Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
};

export default ConfirmacaoParceiro;
