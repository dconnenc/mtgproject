import React from 'react';
import ReactDOM from 'react-dom';
import { Routes, Route, useNavigate, useParams } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import App from './App';
import 'bootstrap/dist/css/bootstrap.css'
import { Auth0Provider, withAuthenticationRequired } from '@auth0/auth0-react';
import { ProfilePage } from './Components/ProfilePage';
import { Auth } from './Components/Auth0/Auth.jsx';
import { useAuth0 } from "@auth0/auth0-react";

//should lines 14-33 be imported from another location?
//On Authentication posts user information to database
const postUser = async (user) => {
   const name = `${user.given_name} ${user.family_name}`;
   const email = user.email;
   const user_id =  user.sub;

   try {
      await fetch("http://localhost:3001/users", {
       method: "POST",
       headers: { "Content-Type": "application/json",},
       body: JSON.stringify({ name: name, email: email, user_id: user_id })
     }).then((response) => {
      console.log(response);
      response.json().then((data) => {
        console.log(data)
      })
     })
   } catch (error) {
     console.error(error.message)
   }
}



//Creates high order component with user data. 
const ProtectedRoute = ({ component, ...args }) => {
  const Component = withAuthenticationRequired(component, args);

  const { isAuthenticated, isLoading, user } = useAuth0();

  if (isAuthenticated && !isLoading) {
    postUser(user)

    return(
      <Component user={user}/>
    )
  } else {
    return(
      <Auth />
    )
  }
};

//?
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
    domain={process.env.REACT_APP_DOMAIN}
    clientId={process.env.REACT_APP_CLIENT_ID}
    redirectUri={window.location.origin}
    >
      <Routes>
        <Route path="/"              element={<ProtectedRoute component={App}/>} />
        <Route path="/profile/:id"   element={<ProtectedRoute component={ProfilePage}/>} />
        <Route path='/auth'          element={<Auth />} />
      </Routes>
    </Auth0ProviderWithRedirectCallback>
  </BrowserRouter>,
  document.getElementById('root')
);

