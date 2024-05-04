// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import modalReducer from './modalSlice';
import formReducer from './formSlice';
import screenSizeReducer from './screenSizeSlice';



export default configureStore({
  reducer: {
    modal: modalReducer,
    form: formReducer,
    screen: screenSizeReducer, 
  }
});
