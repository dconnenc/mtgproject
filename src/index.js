import React from 'react';
import ReactDOM from 'react-dom';
import { Routes, Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import App from './App';
import 'bootstrap/dist/css/bootstrap.css'
import { Auth0Provider } from '@auth0/auth0-react';
import { ProfilePage } from './Components/ProfilePage';

ReactDOM.render(
  <BrowserRouter>
    <Auth0Provider
    domain="dev-tcmbdivh.us.auth0.com"
    clientId="ACNivhbUlhVwJWXBmQxKtcM4jFoNRlqO"
    redirectUri={window.location.origin}
    >
      <Routes>
        <Route path='/' element ={<App />} />
        <Route path="profilepage" element={<ProfilePage />} />
      </Routes>
    </Auth0Provider>
  </BrowserRouter>,
  document.getElementById('root')
);

