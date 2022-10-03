import { useEffect } from "react"

export const GetDBCards = ({ setUserDBCards }) => {
    
    const fetchDBCards = async () => {
        try {
            const response = await fetch('http://localhost:3001/users')
            const jsonData = await response.json();
            setUserDBCards(JSON.parse(jsonData))
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
