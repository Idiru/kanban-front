import { createSlice } from '@reduxjs/toolkit';

export const screenSizeSlice = createSlice({
  name: 'screen',
  initialState: {
    screenSize: window.innerWidth
  },
  reducers: {
    setScreenSize: (state) => {
      state.screenSize = action.payload;
    },
  }
});

export const { setScreenSize } = screenSizeSlice.actions;

export default screenSizeSlice.reducer;
