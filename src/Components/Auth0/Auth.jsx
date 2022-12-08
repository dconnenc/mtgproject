import { Header } from "../Header"
import { Footer } from "../Footer"
import { useAuth0 } from "@auth0/auth0-react";

export const Auth = () => {

  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();
  var background = "https://preview.redd.it/qnnotlcehu731.jpg?auto=webp&s=55d9e57e829608fc8e632eb2e4165d816288177c"

  const clickHandler = () => {
    loginWithRedirect()
  }

      return(
        <div className="background-image"  style={{
          backgroundImage: `url(${background})`,
        }}>
          <Header />
            <div className="greeting-text huge center-box clickable" onClick={clickHandler}>Please login</div>
          <Footer />
        </div>
      )
  }

