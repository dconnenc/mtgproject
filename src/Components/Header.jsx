import { Authenticator} from "./Auth0/authenticatorbutton";
import Profile from "./Auth0/profile";
import { Link } from "react-router-dom";
import Logo from "./Logo.png"

export const Header = ({user}) => {
  return (
      <div id="header" className=".container">
      <div className="row">
        <div className="col-3 vertical-center  wire-frame">
          <Link to={`/profile/${user?.id}`}><Profile /></Link> 
        </div>
        <div className="col-6 vertical-center wire-frame">
          <Link to={"/"}><img id="logo" src={Logo} alt="logo"/></Link>
        </div>
        <div className="col-3 vertical-center  wire-frame">
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