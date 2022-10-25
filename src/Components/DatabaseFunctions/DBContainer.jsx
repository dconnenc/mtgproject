import { DBList } from "./DBList"
import { useEffect, useCallback } from "react"

export const DBContainer = ({ user, cards, setCards, setUserDBCards, userDBCards, setComparisonCards }) => {
    
    const fetchDBCards = useCallback(async () => {
        try {
            const user_id = user.id;
            const response = await fetch(`http://localhost:3001/usersCards/${user_id}`,
                { method: "GET" })
            const jsonData = await response.json();
            
            setUserDBCards(jsonData)
        } catch (error) {
            console.error(error.message)
        }
    }, [setUserDBCards, user.id])

    useEffect(() => {
        fetchDBCards()
    }, [fetchDBCards]);

    if(cards.length > 0){
        return(<div></div>)
    } else{
        return(
            <div id="profile-container wire-frame" className="database-container">
                <h2 className="text-center">Your Lists</h2> 
                <DBList 
                    user={user}
                    userDBCards={userDBCards} 
                    setCards={setCards} 
                    setComparisonCards={setComparisonCards}
                />
            </div>
        )
    }
}
