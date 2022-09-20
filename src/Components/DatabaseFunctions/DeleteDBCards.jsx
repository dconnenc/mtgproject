export const DeleteDBCards = ({id}) => {
    const deleteDBCards = async (id) => {
        try {

            let response = await fetch(`http://localhost:3001/users/${id}`, { method: 'DELETE' })
            console.log(response.body);

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