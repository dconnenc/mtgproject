
export const GetDBCards = (setCards) => {
    const fetchDBCards = (setCards) => {
        

        fetch('http://localhost:3001/users')
        .then(res => res.json())
        .then(json => console.log(json))
    }

    return(
        <>
            <input />
            <button onClick={fetchDBCards}> Get Cards</button>
        </>
    )
}