import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

const LoginButton = ({}) => {
  const { loginWithRedirect } = useAuth0();


  const clickHandler = () => {
    loginWithRedirect()
  }
  return <button className="btn btn-success" onClick={clickHandler}>Log In</button>;
};

export default LoginButton;