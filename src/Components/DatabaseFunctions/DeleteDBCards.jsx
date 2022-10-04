export const DeleteDBCards = ({id, description}) => {
    const deleteDBCards = async (id) => {
        try {
            console.log(id, description)
            await fetch(`http://localhost:3001/usersCards/${id}/${description}`, 
                { method: 'DELETE' }
            )
        } catch (error) {
            console.error(error.message)
        }
    }

    const handleClick = (e) => {
        e.preventDefault();
        deleteDBCards(id)
    }
    
    return(
        <>
            <button className="btn btn-danger" onClick={handleClick}>Delete</button>
        </>
    )
}