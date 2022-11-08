import { Authenticator} from "./Auth0/authenticatorbutton";
import Profile from "./Auth0/profile";
import { Link } from "react-router-dom";
import Logo from "../Assets/Logo.png"

export const Header = ({user}) => {
  return (
      <div id="header" className="header .container">
      <div className="row">
        <div className="col-3 space-top">
          <Link className="greeting-text" to={`/profile/${user?.id}`}><Profile /></Link>
        </div>
        <div className="col-6">
          <Link to={"/"}><img id="logo" src={Logo} alt="logo"/></Link>
        </div>
        <div className="col-3 space-top">
          <Authenticator />
        </div>
      </div>
    </div>
  );
}