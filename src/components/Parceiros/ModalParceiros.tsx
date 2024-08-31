import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, Button, Chip, CircularProgress, IconButton, TextField } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import { Add as AddIcon } from "@mui/icons-material";

import { createParceiro, fetchParceiro, updateParceiro } from "../../services/parceirosService";
import { useMutation, useQuery } from "react-query";
import { Parceiro } from "../../types/Parceiro";

type ModalParceirosProps = {
  isOpen: boolean;
  handleClose: () => void;
  handleSnack: (message: string) => void;
  handleRefetchData: () => void;
  idEdit: string | undefined;
};

type FormValues = {
  name: string;
  description: string;
  repositoryGit: string;
  urlDoc: string;
  clients: string[];
  projects: string[];
};

const ModalParceiros: React.FC<ModalParceirosProps> = ({ isOpen, handleClose, handleSnack, handleRefetchData, idEdit }) => {
  const [formValues, setFormValues] = useState<FormValues>({
    name: "",
    description: "",
    repositoryGit: "",
    urlDoc: "",
    clients: [],
    projects: [],
  });

  const [inputClientes, setInputClientes] = useState<string>("");
  const [inputProjetos, setInputProjetos] = useState<string>("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value,
    });
  };

  const handleAddCliente = () => {
    if (inputClientes && !formValues.clients.includes(inputClientes)) {
      setFormValues({
        ...formValues,
        clients: [...formValues.clients, inputClientes],
      });
      setInputClientes("");
    }
  };

  const handleAddProjeto = () => {
    if (inputProjetos && !formValues.projects.includes(inputProjetos)) {
      setFormValues({
        ...formValues,
        projects: [...formValues.projects, inputProjetos],
      });
      setInputProjetos("");
    }
  };

  const handleRemoveCliente = (clienteToRemove: string) => {
    setFormValues({
      ...formValues,
      clients: formValues.clients.filter((cliente) => cliente !== clienteToRemove),
    });
  };

  const handleRemoveProjeto = (projetoToRemove: string) => {
    setFormValues({
      ...formValues,
      projects: formValues.projects.filter((projeto) => projeto !== projetoToRemove),
    });
  };

  const mutation = useMutation(createParceiro, {
    onSuccess: () => {
      handleSnack("Parceiro cadastrado com sucesso!");
      handleRefetchData();
      handleClose();
    },
    onError: (error) => {
      console.error("Erro ao criar parceiro", error);
    },
  });

  const updateMutation = useMutation(({ id, updatedData }: { id: string; updatedData: Partial<FormValues> }) => updateParceiro(id, updatedData), {
    onSuccess: () => {
      handleSnack("Parceiro editado com sucesso!");
      handleRefetchData();
      handleClose();
    },
    onError: (error) => {
      console.error("Erro ao atualizar parceiro", error);
    },
  });

  const {
    data: parceiro,
    error,
    isLoading,
  } = useQuery<Parceiro>(["parceiro", idEdit], () => fetchParceiro(idEdit!), {
    enabled: !!idEdit,
  });

  useEffect(() => {
    if (!parceiro) return;

    setFormValues({
      name: parceiro.name,
      description: parceiro.description,
      repositoryGit: parceiro.urlDoc,
      urlDoc: parceiro.urlDoc,
      clients: [...parceiro.clients],
      projects: [...parceiro.projects],
    });
  }, [parceiro]);

  const handleSubmit = () => {
    if (idEdit) {
      updateMutation.mutate({ id: idEdit, updatedData: formValues });
    } else {
      mutation.mutate({ ...formValues, createdAt: new Date().toISOString() });
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
        {idEdit ? "Edição de Parceiro" : "Cadastro de Parceiro"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {idEdit && isLoading ? (
            <CircularProgress className="m-auto" />
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-3">
              <TextField label="Nome" name="name" value={formValues.name} onChange={handleChange} variant="outlined" />
              <TextField
                label="Descrição"
                name="description"
                value={formValues.description}
                onChange={handleChange}
                variant="outlined"
                multiline
                rows={4}
              />
              <TextField label="Git" name="repositoryGit" value={formValues.repositoryGit} onChange={handleChange} variant="outlined" />
              <TextField label="Documento" name="urlDoc" value={formValues.urlDoc} onChange={handleChange} variant="outlined" />

              <div className="flex flex-col gap-1">
                <div className="flex">
                  <TextField
                    label="Clientes"
                    value={inputClientes}
                    onChange={(e) => setInputClientes(e.target.value)}
                    variant="outlined"
                    className="mr-2 w-full"
                  />
                  <IconButton onClick={handleAddCliente} color="primary">
                    <AddIcon />
                  </IconButton>
                </div>
                <Box>
                  {formValues.clients.map((cliente, index) => (
                    <Chip key={index} label={cliente} onDelete={() => handleRemoveCliente(cliente)} style={{ margin: "4px" }} />
                  ))}
                </Box>
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex">
                  <TextField
                    label="Projetos"
                    value={inputProjetos}
                    onChange={(e) => setInputProjetos(e.target.value)}
                    variant="outlined"
                    className="mr-2 w-full"
                  />
                  <IconButton onClick={handleAddProjeto} color="primary">
                    <AddIcon />
                  </IconButton>
                </div>
                <Box>
                  {formValues.projects.map((projeto, index) => (
                    <Chip key={index} label={projeto} onDelete={() => handleRemoveProjeto(projeto)} style={{ margin: "4px" }} />
                  ))}
                </Box>
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

export default ModalParceiros;
