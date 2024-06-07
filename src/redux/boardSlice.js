import { createSlice, current } from "@reduxjs/toolkit";

export const boardSlice = createSlice({
  name: "board",
  initialState: {
    board: [],
    currentBoardId: null,
    columns: {},
    tickets: {},
  },
  reducers: {
    addBoard: (state, action) => {
      const newBoard = action.payload;
      state.boards.push(newBoard);
      state.currentBoardId = newBoard.id;
    },
    setCurrentBoard: (state, action) => {
      state.currentBoardId = action.payload;
    },
    addColumn: (state, action) => {
      const { boardId, column } = action.payload;
      if (!state.columns[boardId]) {
        state.columns[boardId] = [];
      }
      state.columns[boardId].push(column);
    },
    addTicket: (state, action) => {
      const { columnId, ticket } = action.payload;
      if (!state.tickets[columnId]) {
        state.tickets[columnId] = [];
      }
      state.tickets[columnId].push(ticket);
    },
  },
});

export const { addBoard, setCurrentBoard, addColumn, addTicket  } = boardSlice.actions;

export default boardSlice.reducer;
