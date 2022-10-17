import { Authenticator} from "./Auth0/authenticatorbutton";
import Profile from "./Auth0/profile";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Logo from "./Logo.png"

export const Header = ({user}) => { 
  return (
      <div id="header" className=".container">
      <div className="row align-middle">
        <div className="col-3">
          <Link to={`/profile/${user}`}><Profile /></Link> 
        </div>
        <div className="col-6">
          <img id="logo" src={Logo} alt="logo"/>
        </div>
        <div className="col-3">
          <Authenticator />
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          
        </div>
      </div>
    </div>
  );
}