import { React, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Routes, Route, useNavigate } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import App from './App';
import 'bootstrap/dist/css/bootstrap.css'
import { Auth0Provider, withAuthenticationRequired } from '@auth0/auth0-react';
import { ProfilePage } from './Components/ProfilePage';
import { ListPage } from './Components/ListPage.jsx'
import { Auth } from './Components/Auth0/Auth.jsx';
import { useAuth0 } from "@auth0/auth0-react";
import AppContextProvider from './Components/AppContext';

//should lines 14-33 be imported from another location?
//On Authentication posts user information to database

const findOrCreateUser = async (externalUser, setUser) => {
  const name    =       `${externalUser.given_name} ${externalUser.family_name}`;
  const email   =       externalUser.email;
  const external_id =   externalUser.sub;

  try {
    await fetch("http://localhost:3001/users", {
      method: "POST",
      headers: { "Content-Type": "application/json",},
      body: JSON.stringify({ name: name, email: email, external_id: external_id })
    })
      .then(response => response.json())
      .then((data) => {
        // the setUser callback is called here to indicate the user is
        // hydrayed with backend data and a page can be rendered knowing a user
        // is ready and authenticated
        setUser({ ...data[0], fetching: false });
      });
  } catch (error) {
    console.error(error.message)
  }
}

// ProtectedRoute is a higher order component that augments a component with
// two things:
//
// 1. It ensures a user is authenticated
// 2. It finds or creates a user

const ProtectedRoute = ({ component, ...args }) => {
  const Component = withAuthenticationRequired(component, args);
  const { isAuthenticated, isLoading, user: externalUser } = useAuth0();

  // user is the internal representation of a user. It is initialized to have
  // fetching be true so this component can render a loading page while the
  // user is being fetched or created. The setUser callback is passed into
  // the find or create call and the fetching flag is set to false. This is how
  // the component updates to render once the user available
  const [user, setUser] = useState({ fetching: true });

  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      findOrCreateUser(externalUser, setUser)
    }
  }, [isLoading])

  if (isAuthenticated && !isLoading) {
    if (user.fetching === true) {
      // This page may flash in development however with a real network it will
      // show for longer. There are two potential ways to fix this.
      //
      // 1. Create and render a component to show a loading state
      // 2. Pass the details down into the rendered component and have it manage
      //    how to show a loading state.
      return(
        <div>Fetching user</div>
      )
    } else {
      // the user passed in is the union of the external auth user and the
      // internal user from the db. You could also create a new objec there that
      // grabs the properties you can about from each one.
      return(
        <Component user={{...externalUser, ...user}}/>
      )
    }
  } else {
    return(
      <Auth />
    )
  }
};

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
      <AppContextProvider>
        <Routes>
          <Route path="/"              element={<ProtectedRoute component={App}/>} />
          <Route path="/profile/:id"   element={<ProtectedRoute component={ProfilePage}/>} />
          <Route path='/auth'          element={<Auth />} />
          {/* The below route should fire for upload list, rendering a page of thier cards. */}
          <Route path='/profile/:id/:description' element={<ProtectedRoute component={ListPage} />} />
        </Routes>
      </AppContextProvider>
    </Auth0ProviderWithRedirectCallback>
  </BrowserRouter>,
  document.getElementById('root')
);

