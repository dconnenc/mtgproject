import { Header } from "../Header"
import { Footer } from "../Footer"
import { useAuth0 } from "@auth0/auth0-react";

export const Auth = () => {

  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();
  var background = "https://preview.redd.it/qnnotlcehu731.jpg?auto=webp&s=55d9e57e829608fc8e632eb2e4165d816288177c"

  const clickHandler = () => {
    loginWithRedirect({ appState: { returnTo: window.location.pathname } })
  }

      return(
        <div className="background-image"  style={{
          backgroundImage: `url(${background})`,
        }}>
          <Header />
            <div className="greeting-text center-box clickable" onClick={clickHandler}>
              <div className="huge">Please login</div>
                <div>   
                      My Pick 1 Pack 1 is an interactive tool that allows Magic the Gathering
                      fans to evaluate cards in a head to head setting. The application was created
                      with Magic's 'Cube' format in mind and allows users to upload their own cube, 
                      and their players to weigh-in to determine a card's score. 
                </div>
              </div>
          <Footer />
        </div>
      )
  }

