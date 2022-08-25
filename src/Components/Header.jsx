import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "./Auth0/login";
import LogoutButton from "./Auth0/logout";
import Profile from "./Auth0/profile";
import { Routes, Route, Link } from "react-router-dom";
import { PostCards } from "./PostCards";

export const Header = ( {background, setBackground, cards} ) => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  return (
    <div id="header" className=".container">
      <div className="row">
        <div className="col-3">
          <Profile />
          <PostCards />
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
