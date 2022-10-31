import { Footer } from "./Footer";
import { Header } from "./Header";
import { ListManager } from "./ListManager"
import { useParams } from "react-router-dom";
import { CardsContext } from "./AppContext";
import { useContext, useEffect, useCallback } from "react";


export const ListPage = ({background, user}) => {
    const {id, list} = useParams();
    console.log(id, list)

    const context = useContext(CardsContext);
    const [cards, setCards] = context["cards"]

    const fetchDBCardsByIdDescription = useCallback(async () => {
        try {
            const response = await fetch(`http://localhost:3001/usersCards/${id}/${list}`,
                { method: "GET" })
            const jsonData = await response.json();
            console.log(jsonData)
            setCards(jsonData)
        } catch (error) {
            console.error(error.message)
        }
    }, [])

    useEffect(()=>{
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