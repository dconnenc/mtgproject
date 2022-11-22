import { Header } from "../Header"
import { Footer } from "../Footer"
import { useAuth0 } from "@auth0/auth0-react";

export const Auth = () => {

  const { isAuthenticated, isLoading } = useAuth0();
  var background = "https://preview.redd.it/qnnotlcehu731.jpg?auto=webp&s=55d9e57e829608fc8e632eb2e4165d816288177c"

    if(isAuthenticated && !isLoading ) {
      window.location.href = "http://localhost:3000/"
    } else {

      return(
        <div className="background-image"  style={{
          backgroundImage: `url(${background})`,
        }}>
          <Header />
            <h1 className="greeting-text center">Please login!</h1>
          <Footer />
        </div>
      )
  }
}
