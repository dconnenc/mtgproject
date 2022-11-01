export const DeleteDBCards = ({id, list}) => {
    
    const deleteDBCards = async () => {
        try {
            console.log(id, list)
            await fetch(`http://localhost:3001/usersCards/${id}/${list}`, 
                { method: 'DELETE' }
            )
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
