import { Footer } from "./Footer";
import { Header } from "./Header";
import { ListManager } from "./ListManager"
import { useParams } from "react-router-dom";
import { CardsContext } from "./AppContext";
import { useContext, useEffect, useCallback, useState } from "react";
import { backgroundQuery } from "./Functions/backgroundQuery";

export const ListPage = ({ user }) => {
    const {id} = useParams();
    const {list} = useParams();

    const context = useContext(CardsContext);
    const [_, setCards] = context["cards"]
    const [cardsLoaded, setCardsLoaded] = context["cardsLoaded"];

    const [background, setBackground] = useState([]);

    const fetchDBCardsByIdDescription = useCallback(async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/usersCards/${id}/${list}`,
                { method: "GET" })
            const jsonData = await response.json();

            let parsedCards = JSON.parse(jsonData.cards[0].cards)
            setCards(parsedCards.cards)
            setCardsLoaded(true)
        } catch (error) {
            console.error(error.message)
        }
    }, [])
    
    useEffect(() => {
        backgroundQuery()
        .then(data => {
            let backgroundImage = data.image_uris ? data.image_uris.art_crop : data.card_faces[0].image_uris.art_crop;
            setBackground(backgroundImage);
        })
        .catch(error =>
            console.log(error.message));
    }, [setBackground]);

    useEffect(() => {
        fetchDBCardsByIdDescription();

    }, [fetchDBCardsByIdDescription])

    return(
        <div className="background-image" style={{
            backgroundImage: `url(${background})`,
        }}>
            <Header user={user}/>

            <ListManager user={user} list={list} />
            
            <Footer />
        </div>
    )
}