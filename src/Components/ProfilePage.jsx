import { Footer } from "./Footer";
import { Header } from "./Header";
import { useParams } from "react-router-dom";
import FileHandler from "./fileHandler";
import { DBContainer } from "./DatabaseFunctions/DBContainer";
import { backgroundQuery } from "./backgroundQuery"
import { useState, useEffect } from "react";

export const ProfilePage = ({ user }) => {
    let {id} = useParams();
    
    const [background, setBackground] = useState([]);

    useEffect(() => {
        backgroundQuery()
        .then(data => {
            setBackground(data.image_uris.art_crop);
        })
        .catch(error =>
            console.log(error.message));
    }, [setBackground]);

    return(
        <div id="master-div" className=".container " style={{
            backgroundImage: `url(${background})`,
            backgroundRepeat:"no-repeat",
            backgroundSize: "cover",
            backgroundAttachment: "fixed",
            boxShadow: "inset 0 0 0 1000px rgba(0,0,0,.4)"
        }}>
            <Header user={user}/>

                <FileHandler user={user}/>
                <DBContainer user={user}/>

            <Footer />
        </div>
    )
}