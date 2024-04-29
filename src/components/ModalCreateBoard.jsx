import React, { useState } from 'react';
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import TextField from '@mui/material/TextField';
import { useModal } from "./ModalContext";
import MainButton from "./MainButton";
import { useKanban } from "./KanbanContext";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function CustomizedDialogs() {
  const { open, modalText, handleClose } = useModal();
  const { addBoard } = useKanban();
  const [boardName, setBoardName] = useState('');
 


  return (
    <React.Fragment>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        sx={{
          ".css-1t1j96h-MuiPaper-root-MuiDialog-paper": {
            minWidth: "100px",
            maxWidth: "500px",
            width: "50%",
            padding: "32px",
            borderRadius: "6px",
          },
        }}
      >
        <DialogTitle
          sx={{ m: 0, p: 2, padding: "0" }}
          id="customized-dialog-title"
        >
          Create a new board
        </DialogTitle>
        <p className="label">Board name</p>
        <TextField
          onChange={(e) => setBoardName(e.target.value)}
          id="outlined-basic"
          variant="outlined"
          sx={{
            ".css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
              { borderColor: "#635fc7" },
          }}
        />{" "}
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent>
          <Typography gutterBottom>{modalText}</Typography>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center" }}>
          <MainButton
            event={() =>
              addBoard({ id: "newBoard", name: boardName, columns: [] })
            }
            text="Create"
          />
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}
