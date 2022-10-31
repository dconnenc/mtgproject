import { Footer } from "./Footer";
import { Header } from "./Header";
import { useParams } from "react-router-dom";
import FileHandler from "./fileHandler";
import { DBContainer } from "./DatabaseFunctions/DBContainer";

export const ProfilePage = ({background, user}) => {
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
                <FileHandler user={user}/>
                <DBContainer user={user}/>
            <Footer />
        </div>
    )
}