import { useEffect } from "react"
import { useAuth0 } from "@auth0/auth0-react";

export const GetDBCards = ({ setUserDBCards }) => {
    const { user } = useAuth0();
    let user_id = user.sub;

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
