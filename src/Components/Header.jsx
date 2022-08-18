import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "./Auth0/login";
import LogoutButton from "./Auth0/logout";
import Profile from "./Auth0/profile";

export const Header = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  return (
    <div id="header" className=".container">
      <div className="row">
        <div className="col-3"><Profile /><button onClick={()=> {console.log(user)}}>Click me!</button></div>
        <div className="col-6"><h1>My P1P1</h1></div>
        <div className="col-3"><LoginButton /><LogoutButton /></div>
      </div>
    </div>
  );
};
