import { Footer } from "./Footer";
import { Header } from "./Header";
import { ListManager } from "./ListManager"
import { useParams } from "react-router-dom";
import { CardsContext } from "./AppContext";
import { useContext, useEffect, useCallback, useState } from "react";
import { backgroundQuery } from "./backgroundQuery"

export const ListPage = ({ user }) => {
    const {id} = useParams();
    const {list} = useParams();

    const contextCards = useContext(CardsContext);
    const [cards, setCards] = contextCards["cards"]
    const [comparisonCards, setComparisonCards] = contextCards["comparisonCards"];

    const [background, setBackground] = useState([]);

    const fetchDBCardsByIdDescription = useCallback(async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/usersCards/${id}/${list}`,
                { method: "GET" })
            const jsonData = await response.json();

            let parsedCards = JSON.parse(jsonData.cards[0].cards)
            console.log("parsed cards=", parsedCards)
            setCards(parsedCards.cards)
        } catch (error) {
            console.error(error.message)
        }
    }, [])
    
    useEffect(() => {
        backgroundQuery()
        .then(data => {
            const backgroundImage = data.image_uris.art_crop ? data.image_uris.art_crop : data.card_faces[0].image_uris.art_crop;
            setBackground(backgroundImage);
        })
        .catch(error =>
            console.log(error.message));
    }, [setBackground]);

    useEffect(() => {
        fetchDBCardsByIdDescription();

    }, [fetchDBCardsByIdDescription])

    useEffect(() => { 
        //sets the comparison cards to two random cards from the list
        const randomCardNum = Math.floor(Math.random() * cards.length)
        const randomCardNum1 = Math.floor(Math.random() * cards.length)

        setComparisonCards([cards[randomCardNum], cards[randomCardNum1]])
    
    }, [cards])

    return(
        <div className="background-image" style={{
            backgroundImage: `url(${background})`,
        }}>
            <Header user={user}/>

            <ListManager user={user} />
            
            <Footer />
        </div>
    )
}