import { React, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import App from './App';
import 'bootstrap/dist/css/bootstrap.css'
import { useAuth0, Auth0Provider, withAuthenticationRequired } from '@auth0/auth0-react';
import AppContextProvider from './Components/AppContext';
import { ProfilePage } from './Components/ProfilePage';
import { ListPage } from './Components/ListPage.jsx'
import { Auth } from './Components/Auth0/Auth.jsx';
import { Loading } from './Components/Loading';
import { findOrCreateUser } from './Components/Functions/findOrCreateUser';

//On Authentication posts user information to database
const ProtectedRoute = ({ component, ...args }) => {
  const Component = withAuthenticationRequired(component, args);
  const { isAuthenticated, isLoading, user: externalUser } = useAuth0();
  const [user, setUser] = useState({ fetching: true });

  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      findOrCreateUser(externalUser, setUser)
    }
  }, [isLoading])

  if (isAuthenticated && !isLoading) {
    if (user.fetching === true) {
      return(
        <Loading />
      )
    } else {
      return(
        <Component user={{...externalUser, ...user}}/>
      )
    }
  } else if(!isAuthenticated) {
    return(
      <Auth />
    )
  }
};

const Auth0ProviderWithRedirectCallback = ({ children, ...props }) => {
  console.log(props);
  const navigate = useNavigate();
  const onRedirectCallback = (appState) => {

    console.log(window.location.pathname)
    console.log("appState=", appState)
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
      <AppContextProvider>
        <Routes>
          <Route path="/"                   element={<ProtectedRoute component={App}/>} />
          <Route path="/profile/:id"        element={<ProtectedRoute component={ProfilePage}/>} />
          <Route path='/profile/:id/:list'  element={<ProtectedRoute component={ListPage} />} />
          <Route path='/auth'               element={<Auth />} />
        </Routes>
      </AppContextProvider>
    </Auth0ProviderWithRedirectCallback>
  </BrowserRouter>,
  document.getElementById('root')
);

