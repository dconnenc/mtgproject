import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

export const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <div className="greeting-text underline right" 
      onClick={() => logout({ returnTo: window.location.origin })
    }>
      Log Out
    </div>
  );
};
