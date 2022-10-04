import React from 'react';
import ReactDOM from 'react-dom';
import { Routes, Route, useNavigate } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import App from './App';
import 'bootstrap/dist/css/bootstrap.css'
import { Auth0Provider, withAuthenticationRequired } from '@auth0/auth0-react';
import { ProfilePage } from './Components/ProfilePage';
import { Auth } from './Components/Auth0/Auth.jsx';
import { useAuth0 } from "@auth0/auth0-react";


//should this be imported from another location?
const postUser = async (user) => {
   const name = `${user.given_name} ${user.family_name}`;
   const email = user.email;
   const user_id =  user.sub;

   try {
     await fetch("http://localhost:3001/users", {
       method: "POST",
       headers: { "Content-Type": "application/json",},
       body: JSON.stringify({ name: name, email: email, user_id: user_id })
     })
   } catch (error) {
     console.error(error.message)
   }
}

const ProtectedRoute = ({ component, ...args }) => {
  const Component = withAuthenticationRequired(component, args);

  const { isAuthenticated, isLoading, user } = useAuth0();

  if (isAuthenticated && !isLoading) {
    postUser(user)

    return(
      <Component />
    )
  } else {
    return(
      <Auth />
    )
  }
};

//rediscuss what this does?
const Auth0ProviderWithRedirectCallback = ({ children, ...props }) => {
  const navigate = useNavigate();
  const onRedirectCallback = (appState) => {
    navigate((appState && appState.returnTo) || window.location.pathname);
  };

  return (
    <Auth0Provider onRedirectCallback={onRedirectCallback} {...props}>
      {children}
    </Auth0Provider>
  );
};

ReactDOM.render(
  <BrowserRouter>
    <Auth0ProviderWithRedirectCallback
    domain="dev-tcmbdivh.us.auth0.com"
    clientId="ACNivhbUlhVwJWXBmQxKtcM4jFoNRlqO"
    redirectUri={window.location.origin}
    >
      <Routes>
        <Route path="/"           element={<ProtectedRoute component={App} />} />
        <Route path='/auth'       element={<Auth />} />
        <Route path="profilepage" element={<ProtectedRoute component={ProfilePage} />} />
      </Routes>
    </Auth0ProviderWithRedirectCallback>
  </BrowserRouter>,
  document.getElementById('root')
);

