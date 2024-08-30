import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, Button, Chip, IconButton, TextField } from "@mui/material";
import { ChangeEvent, useState } from "react";
import { Add as AddIcon } from "@mui/icons-material";

type ModalParceirosProps = {
  isOpen: boolean;
  handleClose: () => void;
};

type FormValues = {
  nome: string;
  descricao: string;
  git: string;
  documento: string;
  clientes: string[];
  projetos: string[];
};

const ModalParceiros: React.FC<ModalParceirosProps> = ({ isOpen, handleClose }) => {
  const id = 0;

  const [formValues, setFormValues] = useState<FormValues>({
    nome: "",
    descricao: "",
    git: "",
    documento: "",
    clientes: [],
    projetos: [],
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
    if (inputClientes && !formValues.clientes.includes(inputClientes)) {
      setFormValues({
        ...formValues,
        clientes: [...formValues.clientes, inputClientes],
      });
      setInputClientes("");
    }
  };

  const handleAddProjeto = () => {
    if (inputProjetos && !formValues.projetos.includes(inputProjetos)) {
      setFormValues({
        ...formValues,
        projetos: [...formValues.projetos, inputProjetos],
      });
      setInputProjetos("");
    }
  };

  const handleRemoveCliente = (clienteToRemove: string) => {
    setFormValues({
      ...formValues,
      clientes: formValues.clientes.filter((cliente) => cliente !== clienteToRemove),
    });
  };

  const handleRemoveProjeto = (projetoToRemove: string) => {
    setFormValues({
      ...formValues,
      projetos: formValues.projetos.filter((projeto) => projeto !== projetoToRemove),
    });
  };

  const handleSubmit = () => {
    console.log(formValues);
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
        {id ? "Edição de Parceiro" : "Cadastro de Parceiro"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-3">
            <TextField label="Nome" name="nome" value={formValues.nome} onChange={handleChange} variant="outlined" />
            <TextField
              label="Descrição"
              name="descricao"
              value={formValues.descricao}
              onChange={handleChange}
              variant="outlined"
              multiline
              rows={4}
            />
            <TextField label="Git" name="git" value={formValues.git} onChange={handleChange} variant="outlined" />
            <TextField label="Documento" name="documento" value={formValues.documento} onChange={handleChange} variant="outlined" />

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
                {formValues.clientes.map((cliente, index) => (
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
                {formValues.projetos.map((projeto, index) => (
                  <Chip key={index} label={projeto} onDelete={() => handleRemoveProjeto(projeto)} style={{ margin: "4px" }} />
                ))}
              </Box>
            </div>
          </form>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancelar</Button>
        <Button onClick={handleSubmit} autoFocus>
          {id ? "Salvar" : "Cadastrar"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalParceiros;
