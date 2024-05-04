import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import CustomTextField from "./CustomTextField";
import MainButton from "./MainButton";
import { useKanban } from "./KanbanContext";
import { closeModal } from "../redux/modalSlice";
import { resetForm } from '../redux/formSlice';
import { useSelector, useDispatch } from "react-redux";


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function CustomizedDialogs() {
  const { addBoard } = useKanban();  
  const open = useSelector((state) => state.modal.open);
  const boardName = useSelector((state) => state.form.boardName);

  const dispatch = useDispatch();

  const handleCreateAndClose = () => {
    if (boardName) {
      dispatch(closeModal());
      dispatch(resetForm()); 
      addBoard({ id: "newBoard", name: boardName, columns: [] });
      
    }
  };

  return (
    <React.Fragment>
      <BootstrapDialog
        onClose={() => dispatch(closeModal())}
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
        <CustomTextField/>
        <IconButton
          aria-label="close"
          onClick={() => dispatch(closeModal())}
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
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center" }}>
          <MainButton state={boardName ? "" : "disable"} onClick={handleCreateAndClose} text="Create" />
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}
