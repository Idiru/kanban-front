// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import modalReducer from './modalSlice';
import formReducer from './formSlice';


export default configureStore({
  reducer: {
    modal: modalReducer,
    form: formReducer,
  }
});
