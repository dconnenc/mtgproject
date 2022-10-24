import { Footer } from "./Footer";
import { Header } from "./Header";
import { useParams } from "react-router-dom";

export const ProfilePage = ({background}) => {
    let {id} = useParams();
    
    return(
        <div id="master-div" className=".container " style={{
            backgroundImage: `url(${background})`,
            backgroundRepeat:"no-repeat",
            backgroundSize: "cover",
            backgroundAttachment: "fixed",
            boxShadow: "inset 0 0 0 1000px rgba(0,0,0,.4)"
        }}>
            <Header />
            

                <div className="col" style={{
                    paddingTop: "25%"
                }}>
                    Profile page for {id}
                </div>

            
            <Footer />
        </div>
    )
}