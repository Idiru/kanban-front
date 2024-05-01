import React from 'react'
import TextField from "@mui/material/TextField";
import { useSelector, useDispatch } from 'react-redux';
import { setBoardName } from '../redux/formSlice';


export default function CustomTextField() {

  const boardName = useSelector((state) => state.form.boardName);
  const dispatch = useDispatch();

  const handleChange = (event) => {
    dispatch(setBoardName(event.target.value));
  };


  return (
         <TextField
          onChange={handleChange}
          id="outlined-basic"
          value={boardName}
          variant="outlined"
          sx={{
            ".css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
              { borderColor: "#635fc7" },
          }}
        />
  )
}
