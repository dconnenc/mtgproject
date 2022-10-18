import { useEffect } from "react"

export const GetDBCards = ({ user, setUserDBCards }) => {
    let user_id = user.id;
    
    const fetchDBCards = async () => {
        try {
            const response = await fetch(`http://localhost:3001/usersCards/${user_id}`,
                { method: "GET" })
            const jsonData = await response.json();
            console.log(jsonData)
            setUserDBCards(jsonData)
        } catch (error) {
            console.error(error.message)
        }
    }

    useEffect(() => {
        fetchDBCards()
    }, []);

    return(
        <>
            <button className="btn btn-success" onClick={fetchDBCards}> Get Cards</button>
        </>
    )
}
