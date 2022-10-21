import { useEffect, useCallback } from "react"

export const GetDBCards = ({ user, setUserDBCards }) => {

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

    return(
        <>
            <button className="btn btn-success" onClick={fetchDBCards}> Get Cards</button>
        </>
    )
}
