import { Authenticator} from "./Auth0/authenticatorbutton";
import Profile from "./Auth0/profile";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";



export const Header = ({user}) => {
  const { isAuthenticated, isLoading } = useAuth0();

  return (
    <div id="header" className=".container">
      <div className="row">
        <div className="col-3">
          { isAuthenticated && !isLoading ? <Link to={`/profile/${user}`}><Profile /></Link> : <Profile />}
        </div>
        <div className="col-6">
          <h1>My P1P1</h1>
        </div>
        <div className="col-3">
          <Authenticator />
        </div>
      </div>
      <div className="row">
        
      </div>
    </div>
  );
};
