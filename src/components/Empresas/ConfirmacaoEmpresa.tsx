import { useMutation, useQuery } from "react-query";
import { Empresa } from "../../types/Empresa";
import { deleteEmpresa } from "../../services/empresasService";
import { Button, CircularProgress, Dialog, DialogActions, DialogTitle } from "@mui/material";

type ConfirmacaoEmpresaProps = {
  open: boolean;
  handleClose: () => void;
  idDelete: string | undefined;
  handleSnack: (message: string) => void;
  handleRefetchData: () => void;
};

const ConfirmacaoEmpresa: React.FC<ConfirmacaoEmpresaProps> = ({ open, idDelete, handleClose, handleSnack, handleRefetchData }) => {
  const { data: empresa } = useQuery<Empresa>(["empresa", idDelete], () => deleteEmpresa(idDelete!), {
    enabled: !!idDelete,
  });

  const deleteMutation = useMutation((id: string) => deleteEmpresa(id), {
    onSuccess: () => {
      handleSnack("Empresa removida com sucesso!");
      handleRefetchData();
      handleClose();
    },
    onError: (error) => {
      console.error("Erro ao deletar empresa", error);
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
      {!empresa ? (
        <CircularProgress className="m-auto" />
      ) : (
        <>
          <DialogTitle id="responsive-dialog-title">
            Tem certeza que deseja remover <strong>{`${empresa?.companyName} / ${empresa?.name}`}</strong> ?
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

export default ConfirmacaoEmpresa;
