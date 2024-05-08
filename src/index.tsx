import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/global.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// import { openGBTStream } from './controller/OpenChatStream';

//local storage and API Key: key should be entered in by the user and will be stored in local storage (NOT session storage)
const envKeyData = localStorage.getItem("GBTKEY");

// prev key is null, but is defined in .env
if (envKeyData != null) {
  localStorage.setItem("GBTKEY", envKeyData);   
}

//openGBTStream({startingPrompt: "give me a few pointers of what I should do with my day"});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
