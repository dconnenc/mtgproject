import { DBList } from "./DBList"
import { useEffect, useCallback, useContext } from "react"
import { CardsContext } from "../AppContext"

export const DBContainer = ({ user }) => {
    const context = useContext(CardsContext);
  
    const [cards, setCards] = context["cards"]
    const [userDBCards, setUserDBCards] = context["userDBCards"];
    const [isLoading, setIsLoading] = context["isLoading"];
    
    const fetchDBCards = useCallback(async () => {
        try {
            const user_id = user.id;
            
            const response = await fetch(`${process.env.REACT_APP_API_URL}/usersCards/${user_id}`,
                { method: "GET" })
            const jsonData = await response.json();
           
            setUserDBCards(jsonData)
        } catch (error) {
            console.error(error.message)
        }
    }, [setUserDBCards, user.id])

            useEffect(() => {
                fetchDBCards();
                
            }, [cards, isLoading]);

    return(
        <div className="database-container">
            <h2 className="text-center">Your Lists</h2> 
            <DBList 
                user={user}
                userDBCards={userDBCards} 
            />
        </div>
    )
}
