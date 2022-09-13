import { useEffect, useState } from "react"

export const GetDBCards = (userDBCards, setUserDBCards) => {
    //const [userDBCards, setUserDBCards] = useState([]);

    const fetchDBCards = async () => {
        try {
            const response = await fetch('http://localhost:3001/users')
            const jsonData = await response.json();
            
            setUserDBCards(jsonData)
            console.log(userDBCards)
            //console.log(jsonData) this line works fine, and logs the data to the console
        } catch (error) {
            console.error(error.message)
        }
    }

    useEffect(() => {
        fetchDBCards()
    }, []);

    return(
        <>
            <button onClick={fetchDBCards}> Get Cards</button>
        </>
    )
}