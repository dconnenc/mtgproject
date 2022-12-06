import { useContext } from "react";
import { CardsContext } from "../AppContext";

export const DeleteDBCards = ({id, list}) => {
    
    const context = useContext(CardsContext);
    const [deleted, setDeleted] = context["deleted"]

    const deleteDBCards = async () => {
        try {
            await fetch(`${process.env.REACT_APP_API_URL}/usersCards/${id}/${list}`, 
                { method: 'DELETE' }
            )
        } catch (error) {
            console.error(error.message)
        }
    }

    const handleClick = (e) => {
        deleteDBCards();
        setDeleted([...deleted, list])
    }
    
    return(
        <>
            <button className="button button-bad" onClick={handleClick}>Delete</button>
        </>
    )
}
