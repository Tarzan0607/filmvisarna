import './css/style.css';
import './utilities/auto-key-lists';
import './css/style-om-oss.css';
import './css/style-butik.css';
import './css/style-footer.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

ReactDOM.createRoot(document.querySelector('#root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
