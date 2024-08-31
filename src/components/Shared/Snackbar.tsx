import { default as Snack } from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

type SnackbarProps = {
  open: boolean;
  handleClose: () => void;
  message: string;
};

const Snackbar: React.FC<SnackbarProps> = ({ open, handleClose, message }) => {
  return (
    <Snack open={open} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
      <Alert onClose={handleClose} severity="success" variant="filled" sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snack>
  );
};

export default Snackbar;
