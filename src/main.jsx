import './css/style.css';
import './utilities/auto-key-lists';

import './css/style-butik.css';
import './css/style-footer.css';
//import './css/style-spelschema.css';
import './css/MovieSeatBookingSystem.css';
import './css/style-om-oss.css';
import './css/MovieSeatBookingSystem.css';
import './css/style-om-oss.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { CookiesProvider } from 'react-cookie';
import App from './App';

ReactDOM.createRoot(document.querySelector('#root')).render(
  <CookiesProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </CookiesProvider>
);
