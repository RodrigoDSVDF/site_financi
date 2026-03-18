import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Verifique se o App está na mesma pasta
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);