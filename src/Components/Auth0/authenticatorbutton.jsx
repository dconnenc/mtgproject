import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { LoginButton } from "./login";
import { LogoutButton } from "./logout";

export const Authenticator = () => {
    const { isAuthenticated } = useAuth0();
    
    return isAuthenticated ? <LogoutButton /> : <LoginButton />
}