import { combineReducers } from '@reduxjs/toolkit';
import nestedDataReducer from './nestedDataSlice';

const rootReducer = combineReducers({
  nestedData: nestedDataReducer
});

export default rootReducer;