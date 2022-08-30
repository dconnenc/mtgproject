import LoginButton from "./Auth0/login";
import LogoutButton from "./Auth0/logout";
import Profile from "./Auth0/profile";
import { Link } from "react-router-dom";

export const Header = ( {background, setBackground, cards} ) => {
 

  return (
    <div id="header" className=".container">
      <div className="row">
        <div className="col-3">
          <Profile />
        </div>
        <div className="col-6">
          <Link to="/">
            <h1>My P1P1</h1>
          </Link></div>
        <div className="col-3">
          <button><Link to={{
              pathname: "/profilepage",
              state: background, setBackground, cards
            }}>My Profile</Link></button>
          <LoginButton />
          <LogoutButton />
        </div>
      </div>
    </div>
  );
};
