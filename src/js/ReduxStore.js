import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';
import nestedDataReducer from "/TaskSlicer.js";

const store = configureStore({
  reducer: nestedDataReducer
});

export default store;