import React from 'react';
import ReactDOM from 'react-dom';
import { Routes, Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import App from './App';
import 'bootstrap/dist/css/bootstrap.css'
import { Auth0Provider } from '@auth0/auth0-react';
import { ProfilePage } from './Components/ProfilePage';

ReactDOM.render(
  <Auth0Provider
    domain={process.env.DOMAIN}
    clientId={process.env.CLIENT_ID}
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

