import { useNavigate } from "react-router-dom"

export const DeleteDBCards = ({id, list}) => {
    const navigate = useNavigate();

    const deleteDBCards = async () => {
        try {
            console.log(id, list)
            await fetch(`${process.env.REACT_APP_API_URL}/usersCards/${id}/${list}`, 
                { method: 'DELETE' }
            )
            .then(()=> {
                console.log("tried to navigate")
                navigate(`/profile/${id}`)
            })
        } catch (error) {
            console.error(error.message)
        }
    }

    const handleClick = (e) => {
        e.preventDefault();
        deleteDBCards()
    }
    
    return(
        <>
            <button className="btn btn-danger" onClick={handleClick}>Delete</button>
        </>
    )
}
