import React from 'react';
import ReactDOM from 'react-dom';
import { Routes, Route, Link } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import App from './App';
import 'bootstrap/dist/css/bootstrap.css'
import { Auth0Provider } from '@auth0/auth0-react';
import { ProfilePage } from './Components/ProfilePage';

ReactDOM.render(
  <Auth0Provider
    domain="dev-tcmbdivh.us.auth0.com"
    clientId="ACNivhbUlhVwJWXBmQxKtcM4jFoNRlqO"
    redirectUri={window.location.origin}
  >
    <BrowserRouter>
      <Routes>
        <Route path='/' element ={<App />} />
        <Route path="profilepage" element={<ProfilePage />} />
      </Routes>
    </BrowserRouter>
  </Auth0Provider>,
  document.getElementById('root')
);

