import LoginButton from "./Auth0/login";
import LogoutButton from "./Auth0/logout";
import Profile from "./Auth0/profile";
import { useAuth0 } from "@auth0/auth0-react";

export const Header = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <div id="header" className=".container">
      <div className="row">
        <div className="col-3">
          <Profile />
        </div>
        <div className="col-6">
            <p>My P1P1</p>
          </div>
        <div className="col-3">
          {isAuthenticated ? <LogoutButton /> : <LoginButton/> }
        </div>
      </div>
    </div>
  );
};
