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

const root = ReactDOM.createRoot(document.getElementById('root'));
const store = createStore(nestedDataReducer);
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
