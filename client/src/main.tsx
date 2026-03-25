import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Garantir que o TypeScript entenda o objeto fbq do Facebook
declare global {
  interface Window {
    fbq: any;
    ttq: any;
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
