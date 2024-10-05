import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import App from './App';
import "./css/WelcomePage.css"
import "./css/tasklist.css"
import "./css/task.css"
import "./css/subtask.css"
import nestedDataReducer from './js/TaskSlicer.js';
import { createStore } from 'redux';
// Importing the Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import { configureStore } from '@reduxjs/toolkit';

const root = ReactDOM.createRoot(document.getElementById('root'));
const store = configureStore({
  reducer: {
    nestedData: nestedDataReducer,
  },
});

function debounce(func, wait) {
  let timeout;
  return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

const saveState = debounce(() => {
  try {
      const state = store.getState();
      const serializedState = JSON.stringify(state.nestedData);
      console.log("Saving state to local storage");
      localStorage.setItem('nestedDataState', serializedState);
  } catch (e) {
      console.warn('Failed to save state to localStorage:', e);
  }
}, 1000); // Adjust the wait time as needed

store.subscribe(() => {
  saveState();
});

console.log("I hope reducer are finally up.")
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
