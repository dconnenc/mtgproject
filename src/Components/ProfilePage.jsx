import { useAuth0 } from "@auth0/auth0-react";
import { Footer } from "./Footer";
import { Header } from "./Header";

export const ProfilePage = ({background, setBackground}) => {
    return(
        <div id="master-div" className=".container " style={{
            backgroundImage: `url(${background})`,
            backgroundRepeat:"no-repeat",
            backgroundSize: "cover",
            backgroundAttachment: "fixed",
            boxShadow: "inset 0 0 0 1000px rgba(0,0,0,.4)"
        }}>
            <Header />
            <div clasName="row">
                <div className="col">
                    <div className="d-flex align-items-center justify-content-center">
                    <div>
                        My lists
                    </div>
                    <button>Save Collection</button>
                    <button>Import Collection</button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}