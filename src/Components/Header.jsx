import { Authenticator} from "./Auth0/authenticatorbutton";
import Profile from "./Auth0/profile";


export const Header = () => {

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
          <Authenticator />
        </div>
      </div>
    </div>
  );
};
