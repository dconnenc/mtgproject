export const DeleteDBCards = ({id, list}) => {

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
        deleteDBCards()
    }
    
    return(
        <>
            <button className="btn btn-danger" onClick={handleClick}>Delete</button>
        </>
    )
}
