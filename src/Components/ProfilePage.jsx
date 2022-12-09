import { Footer } from "./Footer";
import { Header } from "./Header";
import { useParams } from "react-router-dom";
import FileHandler from "./fileHandler";
import { DBContainer } from "./DatabaseFunctions/DBContainer";
import { backgroundQuery } from "./Functions/backgroundQuery"
import { useState, useEffect, useContext } from "react";
import { Loading } from "./Loading";
import { CardsContext } from "./AppContext";

export const ProfilePage = ({ user }) => {
    
    const [background, setBackground] = useState([]);
    
    const contextCards = useContext(CardsContext);
    const [isLoading, _] = contextCards["isLoading"];

    
    useEffect(() => {
        backgroundQuery()
        .then(data => {
            let backgroundImage = data.image_uris ? data.image_uris.art_crop : data.card_faces[0].image_uris.art_crop;
            setBackground(backgroundImage);
        })
        .catch(error =>
            console.log(error.message));
    }, [setBackground]);


    return(
        <div className="background-image" style={{
            backgroundImage: `url(${background})`
        }}>
            <Header user={user}/>
                
                <FileHandler user={user}/>
                { isLoading ?  <Loading /> : <DBContainer user={user}/>}

            <Footer />
        </div>
    )
}