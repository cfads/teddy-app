import {
  Button,
  Checkbox,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  IconButton,
  TextField,
} from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { createEmpresa, fetchEmpresa, updateEmpresa } from "../../services/empresasService";
import { Empresa } from "../../types/Empresa";

type ModalEmpresasProps = {
  isOpen: boolean;
  handleClose: () => void;
  handleSnack: (message: string) => void;
  handleRefetchData: () => void;
  idEdit: string | undefined;
};

type FormValues = {
  name: string;
  companyName: string;
  collaboratorsCount: number;
  isActive: boolean;
};

const ModalEmpresas: React.FC<ModalEmpresasProps> = ({ isOpen, handleClose, handleSnack, handleRefetchData, idEdit }) => {
  const [formValues, setFormValues] = useState<FormValues>({
    name: "",
    companyName: "",
    collaboratorsCount: 0,
    isActive: true,
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target;
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const mutation = useMutation(createEmpresa, {
    onSuccess: () => {
      handleSnack("Empresa cadastrada com sucesso!");
      handleRefetchData();
      handleClose();
    },
    onError: (error) => {
      console.error("Erro ao cadastrar empresa", error);
    },
  });

  const updateMutation = useMutation(({ id, updatedData }: { id: string; updatedData: Partial<FormValues> }) => updateEmpresa(id, updatedData), {
    onSuccess: () => {
      handleSnack("Empresa editada com sucesso!");
      handleRefetchData();
      handleClose();
    },
    onError: (error) => {
      console.error("Erro ao atualizar empresa", error);
    },
  });

  const {
    data: empresa,
    error,
    isLoading,
  } = useQuery<Empresa>(["empresa", idEdit], () => fetchEmpresa(idEdit!), {
    enabled: !!idEdit,
  });

  useEffect(() => {
    if (!empresa) return;

    setFormValues({
      name: empresa.name,
      companyName: empresa.companyName,
      collaboratorsCount: empresa.collaboratorsCount,
      isActive: empresa.isActive,
    });
  }, [empresa]);

  const handleSubmit = () => {
    if (idEdit) {
      const updateData = { ...formValues, lastSubmit: new Date().toISOString() };
      updateMutation.mutate({ id: idEdit, updatedData: updateData });
    } else {
      mutation.mutate({ ...formValues, createdAt: new Date().toISOString(), lastSubmit: new Date().toISOString() });
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      PaperProps={{
        style: {
          minWidth: "50%",
          padding: "20px",
        },
      }}
    >
      <DialogTitle fontSize={28} id="alert-dialog-title">
        {idEdit ? "Edição de Empresa" : "Cadastro de Empresa"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {idEdit && isLoading ? (
            <CircularProgress className="m-auto" />
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-3">
              <TextField label="Nome Fantasia" name="companyName" value={formValues.companyName} onChange={handleChange} variant="outlined" />
              <TextField label="Razão social" name="name" value={formValues.name} onChange={handleChange} variant="outlined" />
              <div className="grid grid-cols-2 gap-8">
                <TextField
                  label="Nº Colaboradores"
                  name="collaboratorsCount"
                  value={formValues.collaboratorsCount}
                  onChange={handleChange}
                  variant="outlined"
                />
                <FormControlLabel
                  control={<Checkbox checked={formValues.isActive} onChange={handleChange} name="isActive" color="primary" />}
                  label="Empresa Ativa ?"
                />
              </div>
            </form>
          )}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancelar</Button>
        <Button onClick={handleSubmit} autoFocus>
          {idEdit ? "Salvar" : "Cadastrar"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalEmpresas;
