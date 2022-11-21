import { Footer } from "./Footer";
import { Header } from "./Header";
import { useParams } from "react-router-dom";
import FileHandler from "./fileHandler";
import { DBContainer } from "./DatabaseFunctions/DBContainer";
import { backgroundQuery } from "./backgroundQuery"
import { useState, useEffect, useContext } from "react";
import { Loading } from "./Loading";
import { CardsContext } from "./AppContext";

export const ProfilePage = ({ user }) => {
    let {id} = useParams();
    
    const [background, setBackground] = useState([]);
    const contextCards = useContext(CardsContext);
    const [isLoading, setIsLoading] = contextCards["isLoading"];

    console.log(isLoading)
    useEffect(() => {
        backgroundQuery()
        .then(data => {
            setBackground(data.image_uris.art_crop);
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
                { !isLoading ?  <Loading /> : <DBContainer user={user}/>}

            <Footer />
        </div>
    )
}