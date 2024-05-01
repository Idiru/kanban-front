import { createSlice } from '@reduxjs/toolkit';

export const formSlice = createSlice({
  name: 'form',
  initialState: {
    boardName: ''
  },
  reducers: {
    setBoardName: (state, action) => {
      state.boardName = action.payload;
    },
    resetForm: (state) => {
      state.boardName = '';
    }
  }
});

export const { setBoardName, resetForm } = formSlice.actions;

export default formSlice.reducer;
