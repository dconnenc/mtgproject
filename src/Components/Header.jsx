import LoginButton from "./Auth0/login";
import LogoutButton from "./Auth0/logout";
import Profile from "./Auth0/profile";

export const Header = () => {
  return (
    <div id="header" className=".container">
      <div className="row">
        <div className="col-3"><Profile /></div>
        <div className="col-6"><h1>My P1P1</h1></div>
        <div className="col-3"><LoginButton /><LogoutButton /></div>
      </div>
    </div>
  );
};
