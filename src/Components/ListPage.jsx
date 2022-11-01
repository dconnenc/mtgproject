import { Footer } from "./Footer";
import { Header } from "./Header";
import { ListManager } from "./ListManager"
import { useParams } from "react-router-dom";
import { CardsContext, BackgroundContext } from "./AppContext";
import { useContext, useEffect, useCallback } from "react";


export const ListPage = ({ user }) => {
    const {id} = useParams();
    const {list} = useParams();
    console.log(id, list)

    const contextCards = useContext(CardsContext);
    const [cards, setCards] = contextCards["cards"]

    const [background, setBackground] = useContext(BackgroundContext)
    

    const fetchDBCardsByIdDescription = useCallback(async () => {
        try {
            const response = await fetch(`http://localhost:3001/usersCards/${id}/${list}`,
                { method: "GET" })
            const jsonData = await response.json();
            
            
            let parsedCards = JSON.parse(jsonData.cards[0].cards)
            console.log(parsedCards)
            setCards(parsedCards)
            console.log("cards =", cards)
        } catch (error) {
            console.error(error.message)
        }
    }, [])

    useEffect(()=>{
        console.log("Use effect ran")
        fetchDBCardsByIdDescription();
    }, [])

    return(
        <div id="master-div" className=".container " style={{
            backgroundImage: `url(${background})`,
            backgroundRepeat:"no-repeat",
            backgroundSize: "cover",
            backgroundAttachment: "fixed",
            boxShadow: "inset 0 0 0 1000px rgba(0,0,0,.4)"
        }}>
            <Header />

            <ListManager user={user} />
            
            <Footer />
        </div>
    )
}