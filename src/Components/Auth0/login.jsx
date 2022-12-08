import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

export const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  const clickHandler = () => {
    loginWithRedirect()
  }
  
  return  <div className="greeting-text underline right green clickable" 
            onClick={clickHandler}
          >
            Log In
          </div>;
};
