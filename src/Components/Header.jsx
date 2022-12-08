import { Authenticator} from "./Auth0/authenticatorbutton";
import { Link } from "react-router-dom";
import Logo from "../Assets/Logo.png"
import { useAuth0 } from "@auth0/auth0-react";


export const Header = ({user}) => {
  const { isAuthenticated } = useAuth0();

  return (
      <div id="header" className="header">
          <Link to={"/"}><img id="logo" className="logo left" src={Logo} alt="logo"/></Link>
          <div className="right greeting-text underline">
            {isAuthenticated ? <Link className="greeting-text left clickable" to={"/"}>Home</Link> : <div></div>}
            {isAuthenticated ? <Link className="greeting-text left yellow clickable" to={`/profile/${user?.id}`}>My Lists</Link> : <div></div>}
            <Authenticator />
          </div>
    </div>
  );
}